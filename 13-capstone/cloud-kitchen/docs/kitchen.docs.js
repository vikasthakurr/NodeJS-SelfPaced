/**
 * @swagger
 * tags:
 *   name: Kitchen
 *   description: Public kitchen browsing endpoints
 */

/**
 * @swagger
 * /api/v1/kitchen:
 *   get:
 *     summary: Get all open kitchens (public)
 *     tags: [Kitchen]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city (case-insensitive)
 *         example: Mumbai
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *         description: Filter by cuisine type
 *         example: Indian
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search kitchens by name
 *         example: Spice
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of kitchens per page
 *     responses:
 *       200:
 *         description: List of kitchens retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 kitchens:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       cuisine:
 *                         type: array
 *                         items:
 *                           type: string
 *                       address:
 *                         type: object
 *                         properties:
 *                           street:
 *                             type: string
 *                           city:
 *                             type: string
 *                           state:
 *                             type: string
 *                           pincode:
 *                             type: string
 *                       image:
 *                         type: object
 *                         properties:
 *                           public_id:
 *                             type: string
 *                           url:
 *                             type: string
 *                       rating:
 *                         type: number
 *                       totalReviews:
 *                         type: integer
 *                       isOpen:
 *                         type: boolean
 *                       deliveryTime:
 *                         type: integer
 *                       deliveryCharge:
 *                         type: number
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 25
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pages:
 *                       type: integer
 *                       example: 3
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/kitchen/{kitchenId}:
 *   get:
 *     summary: Get a single kitchen by ID (public)
 *     tags: [Kitchen]
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *         description: The kitchen ID
 *     responses:
 *       200:
 *         description: Kitchen details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 kitchen:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     cuisine:
 *                       type: array
 *                       items:
 *                         type: string
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                         city:
 *                           type: string
 *                         state:
 *                           type: string
 *                         pincode:
 *                           type: string
 *                     image:
 *                       type: object
 *                       properties:
 *                         public_id:
 *                           type: string
 *                         url:
 *                           type: string
 *                     rating:
 *                       type: number
 *                     totalReviews:
 *                       type: integer
 *                     isOpen:
 *                       type: boolean
 *                     deliveryTime:
 *                       type: integer
 *                     deliveryCharge:
 *                       type: number
 *       404:
 *         description: Kitchen not found
 *       500:
 *         description: Internal server error
 */
