/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Prodcut Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateProduct:
 *        type: object
 *        required:
 *          - title
 *          - dkp
 *          - dkpc
 *          - price
 *        properties:
 *          title:
 *            type: string
 *          dkp:
 *            type: number
 *          dkpc:
 *            type: number
 *          price:
 *            type: number
 *          count:
 *            type: number
 *          color:
 *            type: string
 *          category:
 *            type: string
 *          seller:
 *            type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateProduct:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          dkp:
 *            type: number
 *          dkpc:
 *            type: number
 *          price:
 *            type: number
 *          count:
 *            type: number
 *          color:
 *            type: string
 *          category:
 *            type: string
 *          seller:
 *            type: string
 */

/**
 * @swagger
 * /api/v1/products:
 *  post:
 *    summary: create new product
 *    tags:
 *      - Product
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateProduct"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateProduct"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *  put:
 *    summary: update product
 *    tags:
 *      - Product
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/UpdateProduct"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateProduct"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *  get:
 *    summary: get one product
 *    tags:
 *      - Product
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
 * /api/v1/products/:
 *  get:
 *    summary: get all product
 *    tags:
 *      - Product
 *    parameters:
 *      - in: query
 *        name: search
 *        schema:
 *          type: string
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *      - in: query
 *        name: category
 *        schema:
 *          type: string
 *      - in: query
 *        name: color
 *        schema:
 *          type: string

 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *  delete:
 *    summary: delete one product
 *    tags:
 *      - Product
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: success
 */
