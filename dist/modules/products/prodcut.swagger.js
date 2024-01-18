"use strict";
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
 *        properties:
 *          title:
 *            type: string
 *          dkp:
 *            type: number
 *          dkpc:
 *            type: number
 *          price:
 *            type: number
 *          height:
 *            type: number
 *          width:
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
 *      UpdateRobot:
 *        type: object
 *        properties:
 *          reducePrice:
 *            type: string
 *          maxPrice:
 *            type: number
 *          minPrice:
 *            type: number
 *          isActive:
 *            type: boolean
 *          isBuyBox:
 *            type: boolean
 *          isCheckPrice:
 *            type: boolean
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
 *          height:
 *            type: number
 *          width:
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
 *      200:
 *        description: ok
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
 *        name: sort
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
 *      - in: query
 *        name: seller
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
/**
 * @swagger
 * /api/v1/products/{id}/robot:
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
 *            $ref: "#/components/schemas/UpdateRobot"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateRobot"
 *    responses:
 *      200:
 *        description: ok
 */
