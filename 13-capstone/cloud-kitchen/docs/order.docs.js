/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order placement and management (authenticated users)
 */

/**
 * @swagger
 * /api/v1/order/place:
 *   post:
 *     summary: Place a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [kitchenId, items, deliveryAddress]
 *             properties:
 *               kitchenId:
 *                 type: string
 *                 description: The kitchen ID to order from
 *                 example: 60d5f484f1a2c8b1f8e4e1a1
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [id, quantity]
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60d5f484f1a2c8b1f8e4e1b2
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       example: 2
 *               deliveryAddress:
 *                 type: object
 *                 required: [street, city, state, pincode, phone]
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: 456 Park Avenue
 *                   city:
 *                     type: string
 *                     example: Mumbai
 *                   state:
 *                     type: string
 *                     example: Maharashtra
 *                   pincode:
 *                     type: string
 *                     example: "400002"
 *                   phone:
 *                     type: string
 *                     example: "9876543210"
 *               paymentMethod:
 *                 type: string
 *                 enum: [cod, online, upi]
 *                 default: cod
 *                 example: cod
 *     responses:
 *       201:
 *         description: Order placed successfully
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
 *                   example: Order placed successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error or kitchen is closed
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Kitchen or menu item not found
 */

/**
 * @swagger
 * /api/v1/order/my-orders:
 *   get:
 *     summary: Get all orders of the current user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 */

/**
 * @swagger
 * /api/v1/order/{orderId}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/v1/order/{orderId}/cancel:
 *   patch:
 *     summary: Cancel an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancelReason:
 *                 type: string
 *                 example: Changed my mind
 *     responses:
 *       200:
 *         description: Order cancelled successfully
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
 *                   example: Order cancelled successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Cannot cancel - order is already preparing/delivered/cancelled
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/v1/order/verify-payment:
 *   post:
 *     summary: Verify Razorpay payment for an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId]
 *             properties:
 *               razorpayOrderId:
 *                 type: string
 *                 example: order_ABC123
 *               razorpayPaymentId:
 *                 type: string
 *                 example: pay_XYZ789
 *               razorpaySignature:
 *                 type: string
 *                 example: signature_hash_string
 *               orderId:
 *                 type: string
 *                 example: 60d5f484f1a2c8b1f8e4e1c3
 *     responses:
 *       200:
 *         description: Payment verified successfully
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
 *                   example: Payment verified successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     orderId:
 *                       type: string
 *                     paymentStatus:
 *                       type: string
 *                       example: paid
 *                     orderStatus:
 *                       type: string
 *                       example: confirmed
 *       400:
 *         description: Missing payment details, already verified, or verification failed
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Order not found
 */
