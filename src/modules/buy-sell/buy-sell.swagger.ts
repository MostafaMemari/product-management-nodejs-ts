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
 *      CountSchema:
 *        type: object
 *        required:
 *          - count
 *        properties:
 *          count:
 *            type: integer
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
 *        required: true
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CountSchema"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CountSchema"
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
 *        required: true
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CountSchema"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CountSchema"
 *    responses:
 *      201:
 *        description: created
 */
/**
 * @swagger
 * /api/v1/buy-sell/product/{id}/depo:
 *  post:
 *    summary: depo product
 *    tags:
 *      - BuyAndSell
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CountSchema"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CountSchema"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/buy-sell/product/{id}/report/buy:
 *  get:
 *    summary: get report product
 *    tags:
 *      - BuyAndSell
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/buy-sell/product/{id}/report/sell:
 *  get:
 *    summary: sell report product
 *    tags:
 *      - BuyAndSell
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: success
 */
