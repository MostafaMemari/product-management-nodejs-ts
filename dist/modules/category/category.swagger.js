"use strict";
/**
 * @swagger
 * tags:
 *  name: Category
 *  description: category Module and Routes
 */
/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateCategory:
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
 *      UpdateCategory:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 */
/**
 * @swagger
 * /api/v1/category:
 *  post:
 *    summary: create new category
 *    tags:
 *      - Category
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateCategory"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateCategory"
 *    responses:
 *      201:
 *        description: created
 */
/**
 * @swagger
 * /api/v1/category/{id}:
 *  put:
 *    summary: update category
 *    tags:
 *      - Category
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/UpdateCategory"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateCategory"
 *    responses:
 *      201:
 *        description: created
 */
/**
 * @swagger
 * /api/v1/category/{id}:
 *  get:
 *    summary: get one category
 *    tags:
 *      - Category
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
 * /api/v1/category/:
 *  get:
 *    summary: get all category
 *    tags:
 *      - Category
 *    responses:
 *      200:
 *        description: success
 */
/**
 * @swagger
 * /api/v1/category/{id}:
 *  delete:
 *    summary: delete one category
 *    tags:
 *      - Category
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: success
 */
