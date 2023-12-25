"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundErrorHandler = exports.ApiErrorHandler = void 0;
function ApiErrorHandler(error, req, res, next) {
    const errorCode = error.status || 500;
    const message = error.message || "internal server error";
    res.status(errorCode).json({
        ...error,
        status: errorCode,
        message,
    });
}
exports.ApiErrorHandler = ApiErrorHandler;
function NotFoundErrorHandler(req, res, next) {
    const errorCode = 404;
    const message = "Not Found Page";
    res.status(errorCode).json({
        status: errorCode,
        message,
    });
}
exports.NotFoundErrorHandler = NotFoundErrorHandler;
