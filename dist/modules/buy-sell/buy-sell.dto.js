"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyAndSellDTO = exports.CreateBuyAndSellDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateBuyAndSellDTO {
}
exports.CreateBuyAndSellDTO = CreateBuyAndSellDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Matches)(RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i), {
        message: "object id is not valid",
    }),
    __metadata("design:type", Object)
], CreateBuyAndSellDTO.prototype, "product", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyAndSellDTO.prototype, "date", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyAndSellDTO.prototype, "hour", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBuyAndSellDTO.prototype, "count", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBuyAndSellDTO.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyAndSellDTO.prototype, "operation", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyAndSellDTO.prototype, "status", void 0);
class BuyAndSellDTO {
}
exports.BuyAndSellDTO = BuyAndSellDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BuyAndSellDTO.prototype, "count", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BuyAndSellDTO.prototype, "operation", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BuyAndSellDTO.prototype, "status", void 0);
