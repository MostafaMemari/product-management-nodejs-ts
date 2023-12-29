/**
 * @swagger
 * tags:
 *  name: Color
 *  description: Color Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateColor:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateColor:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 */

/**
 * @swagger
 * /api/v1/colors:
 *  post:
 *    summary: create new color
 *    tags:
 *      - Color
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateColor"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateColor"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/colors/{id}:
 *  put:
 *    summary: update color
 *    tags:
 *      - Color
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/UpdateColor"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateColor"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/colors/{id}:
 *  get:
 *    summary: get one color
 *    tags:
 *      - Color
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
 * /api/v1/colors/:
 *  get:
 *    summary: get all color
 *    tags:
 *      - Color
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/colors/{id}:
 *  delete:
 *    summary: delete one color
 *    tags:
 *      - Color
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: success
 */
