# Cloud Kitchen — Capstone Backend

A production-style REST API for a food-ordering platform (think a mini Swiggy/Zomato
backend). Customers browse kitchens and menus and place orders; kitchen owners (admins)
manage their kitchens, menus, and incoming orders; payments are handled through Razorpay.

This is the capstone for the Node.js course. It pulls together everything from the
earlier sections — Express, middleware, MongoDB/Mongoose, authentication, file uploads,
caching, payments, and API documentation — into one coherent application. Read this
document top to bottom before touching the code; it explains *why* the project is laid
out the way it is, not just *what* each file does.

---

## 1. What the app does (domain model)

There are three kinds of people who use the system:

| Role     | What they can do |
|----------|------------------|
| **User** (customer) | Register, log in, browse kitchens & menus, place orders, pay, track and cancel their own orders. |
| **Admin** (kitchen owner) | Everything a user can do, plus create kitchens, manage menu items, and view/update orders for kitchens they own. |
| **Moderator** | Reserved role in the schema for future use. |

The core entities and how they relate:

```
User ──owns──▶ Kitchen ──has many──▶ MenuItem
  │                │
  │                └──receives──▶ Order
  └──places──────────────────────▶ Order
```

- A **Kitchen** belongs to one owner (a User with the `admin` role).
- A **MenuItem** belongs to exactly one Kitchen.
- An **Order** is placed by a User, is for one Kitchen, and contains a snapshot of the
  menu items ordered (name + price are copied into the order so later menu edits don't
  rewrite order history).

---

## 2. Architecture & folder structure

The project follows a **layered architecture**. Each request flows through distinct
layers, and each layer has one job. This separation is the single most important thing
to understand.

```
Request
   │
   ▼
[ Route ]        maps a URL + HTTP method to a handler, wires up middleware
   │
   ▼
[ Middleware ]   auth, role/ownership checks, validation, caching, file upload
   │
   ▼
[ Controller ]  the actual business logic for one endpoint (one file per endpoint)
   │
   ▼
[ Service ]      reusable external integrations (payments, email) — optional layer
   │
   ▼
[ Model ]        Mongoose schema — talks to MongoDB
   │
   ▼
Response
```

Folder map:

```
cloud-kitchen/
├── index.js                  # Entry point: load env, connect DB + Redis, start server
├── src/
│   └── app.js                # Express app: global middleware, routes, error handler
│
├── config/                   # One file per external dependency / cross-cutting concern
│   ├── db.config.js          #   MongoDB connection
│   ├── redis.config.js       #   Redis client (optional — degrades gracefully)
│   ├── cloudinary.config.js  #   Image hosting
│   ├── multer.config.js      #   Multipart/file upload parsing
│   ├── nodemailer.config.js  #   Email transport
│   ├── razorpay.config.js    #   Payment gateway client
│   ├── rateLimit.config.js   #   Login rate limiter
│   └── swagger.config.js     #   OpenAPI spec definition
│
├── models/                   # Mongoose schemas (the shape of the data)
│   ├── user.model.js
│   ├── kitchen.model.js
│   ├── menu.model.js
│   └── order.model.js
│
├── middleware/               # Functions that run before controllers
│   ├── verifyToken.middle.js #   Authentication (is this a logged-in user?)
│   ├── isAdmin.middle.js     #   Authorization (is this user an admin?)
│   ├── isKitchenOwner.middle.js  # Authorization (does this user own this kitchen?)
│   └── cache.middle.js       #   Redis read-through cache for GET requests
│
├── controllers/              # Business logic, grouped by area, one file per action
│   ├── usercontroller/       #   register, login, getProfile, updateProfile
│   ├── ordercontroller/      #   placeOrder, verifyPayment, getMyOrders, ...
│   └── admincontroller/      #   createKitchen, addMenuItem, updateOrderStatus, ...
│
├── routes/                   # URL → controller wiring, one file per resource
│   ├── auth.route.js
│   ├── kitchen.route.js      #   public browsing (also has inline handlers)
│   ├── menu.route.js         #   public browsing
│   ├── order.route.js
│   └── admin.route.js
│
├── services/                 # Reusable integrations called by controllers
│   ├── payment.service.js    #   Razorpay order creation + signature verification
│   └── notification.service.js
│
├── validators/               # Request-body validation middleware
│   ├── auth.validator.js
│   ├── menu.validator.js
│   └── order.validator.js
│
├── utils/                    # Small shared helpers
│   ├── ApiError.util.js      #   Custom error class with an HTTP status code
│   ├── asyncHandler.util.js  #   Wraps async controllers so errors reach the error handler
│   ├── uploadImage.util.js
│   ├── deleteImage.util.js
│   └── sendEmail.util.js
│
├── docs/                     # Swagger JSDoc comment blocks (the API reference content)
├── seed-admin.js             # Creates an initial admin account
├── seed-data.js              # Seeds sample kitchens/menu for local testing
└── render.yaml               # Render.com deployment config
```

### Why "one file per controller"?

Instead of a single `order.controller.js` with many functions, each action lives in its
own file (`placeOrder.controller.js`, `cancelOrder.controller.js`, ...). This keeps files
tiny and focused, makes imports explicit, and means two people can work on two endpoints
without touching the same file. It is more files, but each one is trivial to read.

---

## 3. The request lifecycle (follow one request end to end)

Trace **"a logged-in user places an order"**:

1. `POST /api/v1/order/place` hits `routes/order.route.js`.
2. `orderRoute.use(verificationToken)` runs first — it reads the `Authorization: Bearer <token>`
   header, verifies the JWT, and attaches the decoded payload to `req.user`.
3. `validateOrder` middleware checks the request body shape.
4. `placeOrder` controller runs: it loads the kitchen, loops the requested items, looks up
   each menu item's **real price from the database** (never trusting a price sent by the
   client), computes the subtotal and total, and saves an `Order` document.
5. The response is returned. If anything threw an `ApiError` along the way, `asyncHandler`
   forwards it to the global error handler in `app.js`, which sends a clean JSON error.

Two patterns make this clean and worth internalizing:

**`asyncHandler`** — Express 5 forwards rejected promises automatically, but this wrapper
keeps behavior explicit and consistent, so no controller needs its own `try/catch`:

```js
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

**`ApiError`** — a custom `Error` subclass carrying an HTTP `statusCode`. Controllers
`throw new ApiError(404, "Kitchen not found")`, and the single error handler turns any
`ApiError` into `res.status(statusCode).json({ message })`. One place controls the error
response format for the whole app.

---

## 4. Authentication & authorization

These are two different things, enforced by three middleware functions that stack:

- **Authentication — `verifyToken`**: *Who are you?* Validates the JWT and sets `req.user`.
- **Authorization — `isAdmin`**: *Are you allowed?* Loads the user and checks `role === "admin"`.
- **Authorization — `isKitchenOwner`**: *Is this yours?* Loads the kitchen by `:kitchenId`
  and checks `kitchen.owner === req.user.id`. This prevents one admin from editing another
  admin's kitchen.

Admin routes stack them: `adminRoute.use(verificationToken, isAdmin)`, then per-route
`isKitchenOwner` on anything scoped to a specific kitchen. Passwords are hashed with
**bcrypt** before saving; the plain password is never stored. Login issues a JWT signed
with `JWT_SECRET`.

---

## 5. Caching (Redis)

Public read endpoints (browsing kitchens and menus) are wrapped in `cache(seconds)`
middleware. On a cache hit it returns the stored JSON immediately; on a miss it lets the
request run and stores the successful response in Redis with a TTL. **If Redis is not
configured or unreachable, the middleware simply calls `next()`** — the app keeps working,
just without caching. This "graceful degradation" is deliberate: an optional dependency
must never take the app down.

---

## 6. Payments (Razorpay)

Payments use a signature-verification flow so the server never trusts the client's word
that a payment succeeded:

1. (Intended flow) The server creates a Razorpay order for the amount.
2. The client pays via Razorpay and receives `razorpay_order_id`, `razorpay_payment_id`,
   and `razorpay_signature`.
3. The client sends those back to `POST /api/v1/order/verify-payment`.
4. The server recomputes the HMAC-SHA256 signature using `RAZORPAY_KEY_SECRET` and only
   marks the order `paid` if it matches.

> Note for students: the verification half is implemented in
> `services/payment.service.js`. Wiring the *creation* half into the place-order flow for
> online payments is a good exercise — see the "Extend it" section.

---

## 7. Data models at a glance

- **User**: `username`, `email` (unique), hashed `password`, `avatar`, `role` (`user`/`admin`/`moderator`).
- **Kitchen**: `name`, `owner` (→ User), `cuisine[]`, `address`, `image`, `rating`, `isOpen`, `deliveryCharge`.
- **MenuItem**: `name`, `price`, `category` (veg/non-veg/egg/vegan), `foodType`, `kitchen` (→ Kitchen), `isAvailable`.
- **Order**: `user` (→ User), `kitchen` (→ Kitchen), `items[]` (snapshot of name/price/qty),
  `subtotal`, `totalAmount`, `paymentMethod`, `paymentStatus`, `orderStatus`.

Order status moves through: `placed → confirmed → preparing → out_for_delivery → delivered`,
or `cancelled`. Payment status: `pending → paid / failed / refunded`.

---

## 8. API overview

Base path: `/api/v1`. Interactive docs are served at **`/api-docs`** (Swagger UI) when the
server is running.

| Area | Method & Path | Auth | Purpose |
|------|---------------|------|---------|
| Auth | `POST /auth/register` | public | Create an account |
| Auth | `POST /auth/login` | public (rate-limited) | Log in, get a JWT |
| Auth | `GET /auth/profile` | user | Get own profile |
| Auth | `PUT /auth/update` | user | Update own profile |
| Kitchens | `GET /kitchen` | public (cached) | Browse/filter kitchens |
| Kitchens | `GET /kitchen/:kitchenId` | public (cached) | One kitchen |
| Menu | `GET /menu/kitchen/:kitchenId` | public (cached) | A kitchen's menu |
| Menu | `GET /menu/:menuItemId` | public (cached) | One menu item |
| Orders | `POST /order/place` | user | Place an order |
| Orders | `GET /order/my-orders` | user | List own orders (paginated) |
| Orders | `GET /order/:orderId` | user | One order |
| Orders | `PATCH /order/:orderId/cancel` | user | Cancel own order |
| Orders | `POST /order/verify-payment` | user | Verify a Razorpay payment |
| Admin | `GET /admin/my-kitchens` | admin | Kitchens you own |
| Admin | `POST /admin/kitchen` | admin | Create a kitchen |
| Admin | `POST /admin/kitchen/:kitchenId/menu` | admin + owner | Add a menu item |
| Admin | `PUT /admin/kitchen/:kitchenId/menu/:menuItemId` | admin + owner | Update a menu item |
| Admin | `DELETE /admin/kitchen/:kitchenId/menu/:menuItemId` | admin + owner | Delete a menu item |
| Admin | `GET /admin/kitchen/:kitchenId/orders` | admin + owner | Orders for your kitchen |
| Admin | `PATCH /admin/kitchen/:kitchenId/orders/:orderId/status` | admin + owner | Update order status |

Send the JWT as a header: `Authorization: Bearer <token>`.

---

## 9. Running it locally

**Prerequisites:** Node.js >= 18, a MongoDB instance (local or Atlas). Redis, Cloudinary,
Razorpay, and email are all optional for basic use — the app runs without them, you just
lose those specific features.

```bash
# 1. Install dependencies
npm install

# 2. Create your env file from the template and fill in values
cp .env.example .env

# 3. (Optional) seed an admin user and sample data
npm run seed          # runs seed-admin.js then seed-data.js

# 4. Start the server
npm run dev           # development, auto-restarts on change (nodemon)
# or
npm start             # production
```

Then open **http://localhost:5000/api-docs** to explore the API.

### Environment variables

See `.env.example` for the full list. The essentials:

| Variable | Required? | Purpose |
|----------|-----------|---------|
| `PORT` | no (default 5000) | Server port |
| `MONGO_URL` | **yes** | MongoDB connection string |
| `JWT_SECRET` | **yes** | Secret used to sign/verify JWTs |
| `CLIENT_URL` | no | Allowed CORS origin |
| `REDIS_URL` | no | Enables caching if set |
| `CLOUDINARY_*` | no | Enables image uploads |
| `RAZORPAY_*` | no | Enables payments |
| `EMAIL_*` | no | Enables email notifications |

> Never commit your real `.env`. It is already listed in `.gitignore`.

---

## 10. Extend it (exercises for students)

Good next steps to deepen your understanding, roughly in order of difficulty:

1. **Harden `verifyToken`**: `jwt.verify` throws on an invalid/expired token — wrap it so a
   bad token returns a clean `401` instead of crashing to a `500`.
2. **Validate the order against the kitchen**: in `placeOrder`, confirm each menu item
   actually belongs to the kitchen being ordered from, and reject empty `items`.
3. **Finish the online payment flow**: call `createRazorpayOrder` when placing a non-COD
   order and return the Razorpay order id to the client.
4. **Broaden rate limiting**: apply a limiter to registration and payment endpoints, and
   set `app.set("trust proxy", 1)` so limits work correctly behind a host like Render.
5. **Add reviews & ratings**: a new model + endpoints, then recompute `kitchen.rating`.

---

## 11. Tech stack

Express 5 · MongoDB + Mongoose · JWT + bcrypt · Redis · Cloudinary · Multer · Razorpay ·
Nodemailer · Helmet · CORS · Morgan · Swagger (OpenAPI 3) · deployed on Render.
