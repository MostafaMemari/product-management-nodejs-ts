"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const http_errors_1 = __importDefault(require("http-errors"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        fs_1.default.mkdirSync(path_1.default.join(process.cwd(), "public", "img", "products"), { recursive: true });
        cb(null, "public/img/products");
    },
    filename: function (req, file, cb) {
        var _a;
        const whiteListFormat = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
        if (whiteListFormat.includes(file.mimetype)) {
            const format = path_1.default.extname(file.originalname);
            const filename = ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.dkp) + format;
            req.body.imgUrl = `/img/products/${filename}`;
            cb(null, filename);
        }
        else {
            cb(http_errors_1.default.BadRequest("فرمت تصویر نا معتبر می باشد"), "");
        }
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 2 * 1000 * 1000,
    },
});
exports.default = upload;
