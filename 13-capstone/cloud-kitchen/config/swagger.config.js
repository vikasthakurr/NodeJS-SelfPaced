import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cloud Kitchen API",
      version: "1.0.0",
      description:
        "REST API documentation for Cloud Kitchen food ordering platform",
      contact: {
        name: "Vikas Kumar",
      },
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`,
        description: process.env.RENDER_EXTERNAL_URL ? "Production server" : "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            username: { type: "string" },
            email: { type: "string" },
            avatar: {
              type: "object",
              properties: {
                public_id: { type: "string" },
                url: { type: "string" },
              },
            },
            role: { type: "string", enum: ["user", "admin", "moderator"] },
          },
        },
        Kitchen: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            cuisine: { type: "array", items: { type: "string" } },
            address: {
              type: "object",
              properties: {
                street: { type: "string" },
                city: { type: "string" },
                state: { type: "string" },
                pincode: { type: "string" },
              },
            },
            image: {
              type: "object",
              properties: {
                public_id: { type: "string" },
                url: { type: "string" },
              },
            },
            rating: { type: "number" },
            totalReviews: { type: "number" },
            isOpen: { type: "boolean" },
            deliveryTime: { type: "number" },
            deliveryCharge: { type: "number" },
          },
        },
        MenuItem: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            category: {
              type: "string",
              enum: ["veg", "non-veg", "egg", "vegan"],
            },
            foodType: {
              type: "string",
              enum: [
                "starter",
                "main-course",
                "dessert",
                "beverage",
                "snack",
                "thali",
              ],
            },
            image: {
              type: "object",
              properties: {
                public_id: { type: "string" },
                url: { type: "string" },
              },
            },
            kitchen: { type: "string" },
            isAvailable: { type: "boolean" },
            rating: { type: "number" },
            totalOrders: { type: "number" },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string" },
            user: { type: "string" },
            kitchen: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  menuItem: { type: "string" },
                  name: { type: "string" },
                  price: { type: "number" },
                  quantity: { type: "number" },
                },
              },
            },
            deliveryAddress: {
              type: "object",
              properties: {
                street: { type: "string" },
                city: { type: "string" },
                state: { type: "string" },
                pincode: { type: "string" },
                phone: { type: "string" },
              },
            },
            subtotal: { type: "number" },
            deliveryCharge: { type: "number" },
            totalAmount: { type: "number" },
            paymentMethod: { type: "string", enum: ["cod", "online", "upi"] },
            paymentStatus: {
              type: "string",
              enum: ["pending", "paid", "failed", "refunded"],
            },
            orderStatus: {
              type: "string",
              enum: [
                "placed",
                "confirmed",
                "preparing",
                "out_for_delivery",
                "delivered",
                "cancelled",
              ],
            },
            cancelReason: { type: "string" },
            deliveredAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    tags: [
      { name: "Auth", description: "Authentication & user profile" },
      { name: "Kitchens", description: "Public kitchen browsing" },
      { name: "Menu", description: "Public menu browsing" },
      { name: "Orders", description: "Order management" },
      { name: "Admin", description: "Admin kitchen & menu management" },
    ],
  },
  apis: ["./docs/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
