import multer from "multer";
import path from "path";
import fs from "fs";
import createHttpError from "http-errors";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(path.join(process.cwd(), "public", "img", "products"), { recursive: true });
    cb(null, "public/img/products");
  },
  filename: function (req: any, file, cb) {
    const whiteListFormat = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (whiteListFormat.includes(file.mimetype)) {
      const format = path.extname(file.originalname);
      const filename = req?.body?.dkp + format;

      req.body.imgUrl = `/img/products/${filename}`;
      cb(null, filename);
    } else {
      cb(createHttpError.BadRequest("فرمت تصویر نا معتبر می باشد"), "");
    }
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1000 * 1000,
  },
});

export default upload;
