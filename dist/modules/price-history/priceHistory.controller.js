"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceHistoryController = void 0;
const http_status_codes_1 = require("http-status-codes");
const auto_bind_1 = __importDefault(require("auto-bind"));
const priceHistory_service_1 = __importDefault(require("./priceHistory.service"));
const priceHistory_dto_1 = require("./priceHistory.dto");
const class_transformer_1 = require("class-transformer");
class PriceHistoryController {
    constructor() {
        this.service = priceHistory_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async find(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(priceHistory_dto_1.PriceHistoryQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const priceHistory = await this.service.find(query);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                data: { priceHistory },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PriceHistoryController = PriceHistoryController;
