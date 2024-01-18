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
 *      buyProduct:
 *        type: object
 *        required:
 *          - count
 *          - operation
 *          - status
 *        properties:
 *          count:
 *            type: integer
 *          operation:
 *            type: "string"
 *            enum: [ "خرابی" , "خرید" ]
 *          status:
 *            type: "string"
 *            enum: [ "buy" ]
 */
/**
 * @swagger
 *  components:
 *    schemas:
 *      sellProduct:
 *        type: object
 *        required:
 *          - count
 *          - operation
 *          - status
 *        properties:
 *          count:
 *            type: integer
 *          operation:
 *            type: "string"
 *            enum: [ "فروش" , "خرابی" , "دپو" ]
 *          status:
 *            type: "string"
 *            enum: [ "sell" ]
 */

/**
 * @swagger
 * /api/v1/buy-sell/product/{id}/buy:
 *  post:
 *    summary: buy product
 *    tags:
 *      - BuyAndSell
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/buyProduct"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/buyProduct"
 *    responses:
 *      201:
 *        description: created
 */
/**
 * @swagger
 * /api/v1/buy-sell/product/{id}/sell:
 *  post:
 *    summary: sell product
 *    tags:
 *      - BuyAndSell
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/sellProduct"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/sellProduct"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/buy-sell/product/{id}/report/buy:
 *  get:
 *    summary: report buy product
 *    tags:
 *      - BuyAndSell
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: ok
 */
/**
 * @swagger
 * /api/v1/buy-sell/product/{id}/report/sell:
 *  get:
 *    summary: report sell product
 *    tags:
 *      - BuyAndSell
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: ok
 */
