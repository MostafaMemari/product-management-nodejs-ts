"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyAndSellController = void 0;
const auto_bind_1 = __importDefault(require("auto-bind"));
const buy_sell_service_1 = __importDefault(require("./buy-sell.service"));
const http_status_codes_1 = require("http-status-codes");
const buy_sell_message_1 = require("./buy-sell.message");
class BuyAndSellController {
    constructor() {
        this.service = buy_sell_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async create(req, res, next) {
        try {
            await this.service.create(req.body);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                statusCode: http_status_codes_1.StatusCodes.CREATED,
                message: buy_sell_message_1.BuyAndSellMessage.Successfully,
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}
exports.BuyAndSellController = BuyAndSellController;
