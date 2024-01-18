/**
 * @swagger
 * tags:
 *  name: Seller
 *  description: seller Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateSeller:
 *        type: object
 *        required:
 *          -sellerID
 *          -sellerTitle
 *          -token
 *        properties:
 *          sellerID:
 *            type: integer
 *          sellerTitle:
 *            type: string
 *          token:
 *            type: string
 *          isRobot:
 *            type: boolean
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateSeller:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 */

/**
 * @swagger
 * /api/v1/sellers:
 *  post:
 *    summary: create new seller
 *    tags:
 *      - Seller
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateSeller"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateSeller"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/sellers/{id}:
 *  put:
 *    summary: update seller
 *    tags:
 *      - Seller
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/UpdateSeller"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateSeller"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/sellers/{id}:
 *  get:
 *    summary: get one seller
 *    tags:
 *      - Seller
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
 * /api/v1/sellers:
 *  get:
 *    summary: get all seller
 *    tags:
 *      - Seller
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/sellers/{id}:
 *  delete:
 *    summary: delete one seller
 *    tags:
 *      - Seller
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: success
 */
