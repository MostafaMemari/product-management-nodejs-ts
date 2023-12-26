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
 * /api/v1/product/create:
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
