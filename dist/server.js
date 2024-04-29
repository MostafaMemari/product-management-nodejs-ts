"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mongoose_config_1 = require("./config/mongoose.config");
const app_routes_1 = require("./app.routes");
const panel_routes_1 = __importDefault(require("./modules/template engine/panel/panel.routes"));
const auth_routes_1 = __importDefault(require("./modules/template engine/auth/auth.routes"));
const error_handler_1 = require("./common/exception/error.handler");
const http = __importStar(require("http"));
const swagger_config_1 = require("./config/swagger.config");
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authorization_guard_1 = require("./common/guard/authorization.guard");
// import { setDefaultData } from "./common/exception/setDefaultDataReq";
class Application {
    constructor(PORT, DB_URL) {
        this.PORT = PORT;
        this.DB_URL = DB_URL;
        this.app = (0, express_1.default)();
        this.DB_URL = DB_URL;
        this.PORT = PORT;
        this.configApplication();
        this.createServer();
        (0, mongoose_config_1.connectMongoDB)(this.DB_URL);
        this.createRoute();
        (0, swagger_config_1.SwaggerConfig)(this.app);
        this.errorHandler();
    }
    configApplication() {
        this.app.use((0, express_session_1.default)({
            secret: "keyboard cat",
            resave: false,
            saveUninitialized: false,
        }));
        // this.app.use(setDefaultData);
        this.app.use((0, express_flash_1.default)());
        this.app.use((0, cors_1.default)({ origin: "*" }));
        // this.app.use(morgan("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET_KEY));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
        this.app.use(express_ejs_layouts_1.default);
        this.app.set("view engine", "ejs");
        this.app.set("layout", "layouts/panel/main.ejs");
    }
    createServer() {
        this.server = http.createServer(this.app);
        this.server.listen(this.PORT, () => {
            console.log(`Server listen on Port : \n http://localhost:${this.PORT}/api-docs \n http://localhost:${this.PORT}/panel/products`);
        });
    }
    createRoute() {
        this.app.use("/", auth_routes_1.default);
        this.app.use("/", authorization_guard_1.Authorization, panel_routes_1.default);
        this.app.use("/api/v1", app_routes_1.AllRouter);
    }
    errorHandler() {
        this.app.use(error_handler_1.NotFoundErrorHandler);
        this.app.use(error_handler_1.ApiErrorHandler);
    }
}
exports.Application = Application;
