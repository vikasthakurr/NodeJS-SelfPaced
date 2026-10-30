/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin panel - Kitchen management, menu CRUD, and order management
 */

/**
 * @swagger
 * /api/v1/admin/my-kitchens:
 *   get:
 *     summary: Get all kitchens owned by the admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admin's kitchens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Kitchen'
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - admin role required
 */

/**
 * @swagger
 * /api/v1/admin/kitchen:
 *   post:
 *     summary: Create a new kitchen
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, address]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Spice Garden
 *               description:
 *                 type: string
 *                 example: Authentic Indian cuisine
 *               cuisine:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Indian", "Chinese"]
 *               address[street]:
 *                 type: string
 *                 example: 123 Main Street
 *               address[city]:
 *                 type: string
 *                 example: Mumbai
 *               address[state]:
 *                 type: string
 *                 example: Maharashtra
 *               address[pincode]:
 *                 type: string
 *                 example: "400001"
 *               deliveryTime:
 *                 type: integer
 *                 example: 30
 *                 description: Delivery time in minutes
 *               deliveryCharge:
 *                 type: number
 *                 example: 40
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Kitchen created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Kitchen created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Kitchen'
 *       400:
 *         description: Validation error - name and complete address required
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - admin role required
 */

/**
 * @swagger
 * /api/v1/admin/kitchen/{kitchenId}/menu:
 *   post:
 *     summary: Add a menu item to a kitchen
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *         description: The kitchen ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, price, category, foodType]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Butter Chicken
 *               description:
 *                 type: string
 *                 example: Creamy tomato-based curry with tender chicken
 *               price:
 *                 type: number
 *                 example: 299
 *               category:
 *                 type: string
 *                 enum: [veg, non-veg, egg, vegan]
 *                 example: non-veg
 *               foodType:
 *                 type: string
 *                 enum: [starter, main-course, dessert, beverage, snack, thali]
 *                 example: main-course
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Menu item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Menu item added successfully
 *                 data:
 *                   $ref: '#/components/schemas/MenuItem'
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - must be kitchen owner
 */

/**
 * @swagger
 * /api/v1/admin/kitchen/{kitchenId}/menu/{menuItemId}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *         description: The kitchen ID
 *       - in: path
 *         name: menuItemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The menu item ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Paneer Tikka
 *               description:
 *                 type: string
 *                 example: Grilled cottage cheese with spices
 *               price:
 *                 type: number
 *                 example: 249
 *               category:
 *                 type: string
 *                 enum: [veg, non-veg, egg, vegan]
 *               foodType:
 *                 type: string
 *                 enum: [starter, main-course, dessert, beverage, snack, thali]
 *               isAvailable:
 *                 type: boolean
 *                 example: true
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Menu item updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/MenuItem'
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - must be kitchen owner
 *       404:
 *         description: Menu item not found in this kitchen
 */

/**
 * @swagger
 * /api/v1/admin/kitchen/{kitchenId}/menu/{menuItemId}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *         description: The kitchen ID
 *       - in: path
 *         name: menuItemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The menu item ID
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Menu item deleted successfully
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - must be kitchen owner
 *       404:
 *         description: Menu item not found in this kitchen
 */

/**
 * @swagger
 * /api/v1/admin/kitchen/{kitchenId}/orders:
 *   get:
 *     summary: Get all orders for a kitchen
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *         description: The kitchen ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [placed, confirmed, preparing, out_for_delivery, delivered, cancelled]
 *         description: Filter orders by status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of orders per page
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                 totalOrders:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - must be kitchen owner
 */

/**
 * @swagger
 * /api/v1/admin/kitchen/{kitchenId}/orders/{orderId}/status:
 *   patch:
 *     summary: Update order status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *         description: The kitchen ID
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderStatus]
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum: [placed, confirmed, preparing, out_for_delivery, delivered, cancelled]
 *                 example: preparing
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Order status updated to preparing
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid status or order already delivered/cancelled
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - must be kitchen owner
 *       404:
 *         description: Order not found in this kitchen
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Kitchen:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         cuisine:
 *           type: array
 *           items:
 *             type: string
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             pincode:
 *               type: string
 *         image:
 *           type: object
 *           properties:
 *             public_id:
 *               type: string
 *             url:
 *               type: string
 *         rating:
 *           type: number
 *         totalReviews:
 *           type: integer
 *         isOpen:
 *           type: boolean
 *         deliveryTime:
 *           type: integer
 *         deliveryCharge:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     MenuItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *           enum: [veg, non-veg, egg, vegan]
 *         foodType:
 *           type: string
 *           enum: [starter, main-course, dessert, beverage, snack, thali]
 *         image:
 *           type: object
 *           properties:
 *             public_id:
 *               type: string
 *             url:
 *               type: string
 *         kitchen:
 *           type: string
 *         isAvailable:
 *           type: boolean
 *         rating:
 *           type: number
 *         totalOrders:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         kitchen:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               menuItem:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *         deliveryAddress:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             pincode:
 *               type: string
 *             phone:
 *               type: string
 *         subtotal:
 *           type: number
 *         deliveryCharge:
 *           type: number
 *         totalAmount:
 *           type: number
 *         paymentMethod:
 *           type: string
 *           enum: [cod, online, upi]
 *         paymentStatus:
 *           type: string
 *           enum: [pending, paid, failed, refunded]
 *         orderStatus:
 *           type: string
 *           enum: [placed, confirmed, preparing, out_for_delivery, delivered, cancelled]
 *         cancelReason:
 *           type: string
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
