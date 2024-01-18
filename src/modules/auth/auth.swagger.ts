/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: regiter Auth and login
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      RegisterUser:
 *        type: object
 *        required:
 *          -fullName
 *          -username
 *          -email
 *          -password
 *          -confirmPassword
 *        properties:
 *          fullName:
 *            type: string
 *          username:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          confirmPassword:
 *            type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      LoginUser:
 *        type: object
 *        required:
 *          -identifier
 *          -password
 *        properties:
 *          identifier:
 *            description: enter email or username
 *            type: string
 *          password:
 *            type: string
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    summary: register user
 *    tags:
 *      - Auth
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/RegisterUser"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/RegisterUser"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    summary: register user
 *    tags:
 *      - Auth
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/RegisterUser"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/RegisterUser"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: login user
 *    tags:
 *      - Auth
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/LoginUser"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/LoginUser"
 *    responses:
 *      201:
 *        description: created
 */
