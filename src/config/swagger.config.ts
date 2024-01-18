import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export function SwaggerConfig(app: Application) {
  const options = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "REST API for Swagger Documentation",
        version: "1.0.0",
      },
      schemes: ["http", "https"],
      servers: [{ url: "http://localhost:4600/" }, { url: "http://localhost:4500/" }],
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.ts", process.cwd() + "/dist/modules/**/*.swagger.js"],
  };
  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
