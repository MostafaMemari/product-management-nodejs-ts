"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerConfig = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
function SwaggerConfig(app) {
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
    const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
}
exports.SwaggerConfig = SwaggerConfig;
