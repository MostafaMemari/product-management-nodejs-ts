"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_dto_1 = require("./category.dto");
const class_transformer_1 = require("class-transformer");
const http_status_codes_1 = require("http-status-codes");
const category_service_1 = __importDefault(require("./category.service"));
const category_message_1 = require("./category.message");
const auto_bind_1 = __importDefault(require("auto-bind"));
const public_types_1 = require("../../types/public.types");
class CategoryController {
    constructor() {
        this.service = category_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async create(req, res, next) {
        try {
            const categoryDto = (0, class_transformer_1.plainToClass)(category_dto_1.CategoryDTO, req.body, { excludeExtraneousValues: true });
            await this.service.create(categoryDto);
            req.flash("success", "ثبت دسته بندی انجام شد");
            res.redirect("/panel/products");
            // res.status(StatusCodes.CREATED).json({
            //   statusCode: StatusCodes.CREATED,
            //   message: CategoryMessage.Created,
            // });
        }
        catch (error) {
            req.flash("error", "ثبت دسته بندی با خطا مواجه شد");
            res.redirect("/panel/products");
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const categoryID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const categoryDto = (0, class_transformer_1.plainToClass)(category_dto_1.CategoryUpdateDTO, req.body, {
                excludeExtraneousValues: true,
                exposeUnsetFields: false,
            });
            await this.service.update(categoryID, categoryDto);
            req.flash("success", "ثبت دسته بندی انجام شد");
            res.redirect("/panel/products");
            // res.status(StatusCodes.OK).json({
            //   message: CategoryMessage.Updated,
            // });
        }
        catch (error) {
            req.flash("error", "ویرایش دسته بندی با خطا مواجه شد");
            res.redirect("/panel/products");
            next(error);
        }
    }
    async findByID(req, res, next) {
        try {
            const categoryID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true });
            const category = await this.service.findByID(categoryID);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                data: { category },
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async find(req, res, next) {
        try {
            const categories = await this.service.find();
            res.status(http_status_codes_1.StatusCodes.OK).json({
                data: { categories },
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async removeByID(req, res, next) {
        try {
            console.log(req.params);
            const categoryID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true });
            await this.service.removeByID(categoryID);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: category_message_1.CategoryMessage.Deleted,
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}
exports.CategoryController = CategoryController;
