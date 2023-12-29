/**
 * @swagger
 * tags:
 *  name: BuyAndSell
 *  description: BuyAndSell Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateBuyAndSell:
 *        type: object
 *        required:
 *          - product
 *          - count
 *          - price
 *          - operation
 *        properties:
 *          product:
 *            type: string
 *          count:
 *            type: number
 *          price:
 *            type: number
 *          operation:
 *            type: string
 *            enum:
 *              - فروش
 *              - خرید
 *              - دپو
 *              - خرابی
 */

/**
 * @swagger
 * /api/v1/buy-sell:
 *  post:
 *    summary: buy and sell
 *    tags:
 *      - BuyAndSell
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateBuyAndSell"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateBuyAndSell"
 *    responses:
 *      201:
 *        description: created
 */
