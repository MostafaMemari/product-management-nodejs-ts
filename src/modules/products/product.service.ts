import createHttpError from "http-errors";
import { errorHandler } from "../../common/exception/error.handler";
import { FindDoc, ObjectIdDTO } from "../../types/public.types";
import { ProductDTO, ProductQueryDTO, ProductUpdateDTO } from "./product.dto";
import { ProductModel } from "./product.model";
import { IProduct } from "./product.types";
import { ProductMessage } from "./product.message";
import { IColor } from "../color/color.types";
import { ICategory } from "../category/category.types";
import path from "path";
import fs from "fs";

class ProductService {
  async create(productDto: ProductDTO, reqFile: any): Promise<IProduct> {
    errorHandler({ productDto });

    let img = null;
    if (reqFile) {
      const { destination, filename } = reqFile;
      img = (destination + "/" + filename).replace("public/", "/");
    } else {
      img = "/img/products/no-image.jpg";
    }

    const product: IProduct = await ProductModel.create({ ...productDto, img });
    return product;
  }

  async update(productID: ObjectIdDTO, productDto: ProductUpdateDTO, reqFile: any): Promise<boolean> {
    errorHandler({ productID, productDto });

    const product = await this.checkExistProduct(productID);
    const defaultPathImg = "/img/products/no-image.jpg";
    let img = null;
    if (reqFile) {
      const { destination, filename } = reqFile;
      const pathNewImg = (destination + "/" + filename).replace("public/", "/");

      if (product?.img) {
        if (product?.img === pathNewImg) {
          img = pathNewImg;
        } else {
          if (product?.img !== defaultPathImg) {
            fs.unlinkSync(path.join(process.cwd(), "public", product?.img));
            img = pathNewImg;
          } else {
            img = pathNewImg;
          }
        }
      } else {
        img = pathNewImg;
      }
    } else {
      img = product?.img ? product?.img : defaultPathImg;
    }

    const result: any = await ProductModel.updateOne({ _id: productID.id }, { ...productDto, img });
    if (!result.modifiedCount) throw createHttpError.InternalServerError();
    return true;
  }

  async findByID(productID: ObjectIdDTO): Promise<FindDoc<IProduct>> {
    errorHandler({ productID });
    return await this.checkExistProduct(productID);
  }

  async find(query: ProductQueryDTO, colorsDto: IColor[], categoryDto: ICategory[]): Promise<IProduct[]> {
    const page = parseInt(query.page) - 1 || 0;
    const limit = parseInt(query.limit) || 40;
    const search = query.search || "";
    const sort = query.sort == "asc" ? "asc" : "desc" || "desc";

    let categories: any = query?.category?.split(",") || "ALL";
    let colors: any = query?.color?.split(",") || "ALL";

    colors === "ALL"
      ? (colors = colorsDto.map((color) => String(color._id)))
      : (colors = colorsDto.filter((color) => colors.includes(color.name)).map((id) => String(id._id)));

    categories === "ALL"
      ? (categories = categoryDto.map((category) => String(category._id)))
      : (categories = categoryDto.filter((category) => categories.includes(category.name)).map((id) => String(id._id)));

    const products: IProduct[] = await ProductModel.find({ title: { $regex: search, $options: "i" } })
      .where("category")
      .in(categories)
      .where("color")
      .in(colors)
      .skip(page * limit)
      .limit(limit)
      .sort({ updatedAt: sort == "asc" ? 1 : -1 })
      .populate("color")
      .populate("category");

    const total = await ProductModel.countDocuments({
      category: { $in: [...categories] },
      color: { $in: [...colors] },
      title: { $regex: search, $options: "i" },
    });

    const response: any = {
      total,
      pages: Math.ceil(total / limit),
      page: page + 1,
      limit,

      products,
    };

    return response;
  }

  async removeByID(productID: ObjectIdDTO): Promise<boolean> {
    errorHandler({ productID });
    const product = await this.checkExistProduct(productID);

    const deletedProduct: any = await ProductModel.deleteOne({ _id: product?.id });
    if (!deletedProduct.deletedCount) throw createHttpError.InternalServerError();
    fs.unlinkSync(path.join(process.cwd(), "public", String(product?.img)));
    return true;
  }

  async checkExistProduct(productID: ObjectIdDTO): Promise<FindDoc<IProduct>> {
    const product: FindDoc<IProduct> = await ProductModel.findById(productID.id);
    if (!product) throw createHttpError.NotFound(ProductMessage.NotFound);
    return product;
  }
}
export default new ProductService();
