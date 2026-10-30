/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Public menu browsing endpoints
 */

/**
 * @swagger
 * /api/v1/menu/kitchen/{kitchenId}:
 *   get:
 *     summary: Get all available menu items for a kitchen (public)
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *         description: The kitchen ID
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [veg, non-veg, egg, vegan]
 *         description: Filter by food category
 *       - in: query
 *         name: foodType
 *         schema:
 *           type: string
 *           enum: [starter, main-course, dessert, beverage, snack, thali]
 *         description: Filter by food type
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search menu items by name
 *         example: Paneer
 *     responses:
 *       200:
 *         description: Menu items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menuItems:
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
 *                       price:
 *                         type: number
 *                       category:
 *                         type: string
 *                         enum: [veg, non-veg, egg, vegan]
 *                       foodType:
 *                         type: string
 *                         enum: [starter, main-course, dessert, beverage, snack, thali]
 *                       image:
 *                         type: object
 *                         properties:
 *                           public_id:
 *                             type: string
 *                           url:
 *                             type: string
 *                       kitchen:
 *                         type: string
 *                       isAvailable:
 *                         type: boolean
 *                       rating:
 *                         type: number
 *                       totalOrders:
 *                         type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/menu/{menuItemId}:
 *   get:
 *     summary: Get a single menu item by ID (public)
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: menuItemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The menu item ID
 *     responses:
 *       200:
 *         description: Menu item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menuItem:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     category:
 *                       type: string
 *                       enum: [veg, non-veg, egg, vegan]
 *                     foodType:
 *                       type: string
 *                       enum: [starter, main-course, dessert, beverage, snack, thali]
 *                     image:
 *                       type: object
 *                       properties:
 *                         public_id:
 *                           type: string
 *                         url:
 *                           type: string
 *                     kitchen:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         image:
 *                           type: object
 *                           properties:
 *                             public_id:
 *                               type: string
 *                             url:
 *                               type: string
 *                         rating:
 *                           type: number
 *                     isAvailable:
 *                       type: boolean
 *                     rating:
 *                       type: number
 *                     totalOrders:
 *                       type: integer
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Internal server error
 */
