"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.NotFoundErrorHandler = exports.ApiErrorHandler = void 0;
const class_validator_1 = require("class-validator");
const http_errors_1 = __importDefault(require("http-errors"));
function ApiErrorHandler(error, req, res, next) {
    if (error.status === 401) {
        res.redirect("/login");
    }
    // const errorCode: number = error.status || 500;
    // const message: string = error.message || "internal server error";
    // res.status(errorCode).json({
    //   status: errorCode,
    //   ...error,
    //   message,
    // });
}
exports.ApiErrorHandler = ApiErrorHandler;
function NotFoundErrorHandler(req, res, next) {
    const errorCode = 404;
    const message = "Not Found Page";
    res.locals.layout = "./pages/error-page.ejs";
    res.render("./pages/error-page.ejs");
    // res.status(errorCode).json({
    //   status: errorCode,
    //   message,
    // });
}
exports.NotFoundErrorHandler = NotFoundErrorHandler;
function errorHandler(dto) {
    let errors = [];
    for (const i in dto) {
        const error = (0, class_validator_1.validateSync)(dto[i]);
        errors.push(...error);
    }
    let errorTexts = [];
    for (const errorItem of errors) {
        errorTexts = errorTexts.concat(errorItem.constraints);
    }
    if (errorTexts.length > 0)
        throw { ...http_errors_1.default.BadRequest(), errorTexts };
    return errorTexts;
}
exports.errorHandler = errorHandler;
