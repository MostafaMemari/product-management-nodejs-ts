import createHttpError from "http-errors";
import { errorHandler } from "../../common/exception/error.handler";
import { FindDoc, ObjectIdDTO } from "../../types/public.types";
import { ProductDTO, ProductQueryDTO, ProductRobotDTO, ProductUpdateDTO } from "./product.dto";
import { ProductModel } from "./product.model";
import { IProduct } from "./product.types";
import { ProductMessage } from "./product.message";
import { IColor } from "../color/color.types";
import { ICategory } from "../category/category.types";
import path from "path";
import fs from "fs";
import { ISeller } from "../seller/seller.types";
import { BuyAndSellModel } from "../buy-sell/buy-sell.model";

class ProductService {
  async create(productDto: ProductDTO, reqFile: any): Promise<IProduct> {
    errorHandler({ productDto });

    let img = null;
    if (reqFile) {
      const { destination, filename } = reqFile;
      img = (destination + "/" + filename).replace("public/", "/");
    } else {
      img = process.env.DEFAULT_IMG_PRODUCT;
    }
    const product: IProduct = await ProductModel.create({ ...productDto, img });

    return product;
  }
  async update(productID: ObjectIdDTO, productDto: ProductUpdateDTO, reqFile: any): Promise<boolean> {
    errorHandler({ productID, productDto });
    const product: FindDoc<IProduct> = await this.checkExistProduct(productID);

    const defaultPathImg = process.env.DEFAULT_IMG_PRODUCT;
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
  async updateRobot(productID: ObjectIdDTO, productDto: ProductRobotDTO): Promise<boolean> {
    errorHandler({ productID, productDto });

    const result: any = await ProductModel.updateOne({ _id: productID.id }, { robot: { ...productDto } });
    if (!result.modifiedCount) throw createHttpError.InternalServerError();
    return true;
  }
  async findByID(productID: ObjectIdDTO): Promise<FindDoc<IProduct>> {
    errorHandler({ productID });
    return await this.checkExistProduct(productID);
  }
  // async find(query: ProductQueryDTO, colorsDto: IColor[], categoryDto: ICategory[], sellerDto: ISeller[]): Promise<IProduct[]> {
  //   const page = parseInt(query.page) - 1 || 0;
  //   const limit = parseInt(query.limit) || 15;
  //   const search = query.search || "";
  //   const sort = query.sort == "asc" ? "asc" : "desc" || "desc";

  //   let categories: any = query?.category?.split(",") || "ALL";
  //   let colors: any = query?.color?.split(",") || "ALL";
  //   let sellers: any = query?.seller?.split(",") || "ALL";

  //   colors === "ALL"
  //     ? (colors = colorsDto.map((color) => String(color._id)))
  //     : (colors = colorsDto.filter((color) => colors.includes(color.name)).map((id) => String(id._id)));

  //   categories === "ALL"
  //     ? (categories = categoryDto.map((category) => String(category._id)))
  //     : (categories = categoryDto.filter((category) => categories.includes(category.name)).map((id) => String(id._id)));

  //   sellers === "ALL"
  //     ? (sellers = sellerDto.map((seller) => String(seller._id)))
  //     : (sellers = sellerDto.filter((seller) => sellers.includes(seller.sellerTitle)).map((id) => String(id._id)));

  //   const products: IProduct[] = await ProductModel.find({ title: { $regex: search, $options: "i" } })
  //     .where("category")
  //     .in(categories)
  //     .where("color")
  //     .in(colors)
  //     .where("seller")
  //     .in(sellers)
  //     .skip(page * limit)
  //     .limit(limit)
  //     .sort({ updatedAt: sort == "asc" ? 1 : -1 })
  //     .populate("color")
  //     .populate("category")
  //     .populate("seller", "sellerTitle")
  //     .lean();

  //   const total = await ProductModel.countDocuments({
  //     category: { $in: [...categories] },
  //     color: { $in: [...colors] },
  //     seller: { $in: [...sellers] },
  //     title: { $regex: search, $options: "i" },
  //   });

  //   const response: any = {
  //     total,
  //     pages: Math.ceil(total / limit),
  //     page: page + 1,
  //     limit,
  //     products,
  //   };

  //   return response;
  // }
  async find(query: ProductQueryDTO, params: any, colorsDto: IColor[], categoryDto: ICategory[], sellerDto: ISeller[]): Promise<IProduct[]> {
    const page = parseInt(query.page) - 1 || 0;
    const limit = parseInt(query.limit) || 15;
    const search = query.search || "";
    const sort = query.sort == "asc" ? "asc" : "desc" || "desc";

    // let categories: any = query?.category?.split(",") || "ALL";
    // let colors: any = query?.color?.split(",") || "ALL";
    // let sellers: any = query?.seller?.split(",") || "ALL";

    // colors === "ALL"
    //   ? (colors = colorsDto.map((color) => String(color._id)))
    //   : (colors = colorsDto.filter((color) => colors.includes(color.name)).map((id) => String(id._id)));

    // categories === "ALL"
    //   ? (categories = categoryDto.map((category) => String(category._id)))
    //   : (categories = categoryDto.filter((category) => categories.includes(category.name)).map((id) => String(id._id)));

    // sellers === "ALL"
    //   ? (sellers = sellerDto.map((seller) => String(seller._id)))
    //   : (sellers = sellerDto.filter((seller) => sellers.includes(seller.sellerTitle)).map((id) => String(id._id)));

    console.log(params.buyAndSell);

    const products: IProduct[] = await ProductModel.aggregate([
      {
        $match: {
          $or: [
            {
              title: {
                $regex: new RegExp("", "i"),
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "buyandsells",
          localField: "_id",
          foreignField: "product",
          pipeline: [
            {
              $match: {
                $and: [
                  {
                    status: params.buyAndSell,
                  },
                  {
                    operation: {
                      $ne: "خرابی",
                    },
                  },
                ],
              },
            },
            {
              $group: {
                _id: "",
                sumCountAll: {
                  $sum: "$count",
                },
                products: {
                  $push: "$$ROOT",
                },
              },
            },
            {
              $unwind: {
                path: "$products",
              },
            },
            {
              $match: {
                "products.createdAt": {
                  $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
                },
              },
            },
            {
              $sort: {
                "products.createdAt": -1,
              },
            },
            {
              $group: {
                _id: "",
                sumCountMonth: {
                  $sum: "$products.count",
                },
                sumCountAll: {
                  $first: "$sumCountAll",
                },
                lastOperation: {
                  $first: "$products",
                },
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
          ],
          as: "report",
        },
      },
      {
        $unwind: {
          path: "$report",
        },
      },
    ]);

    console.log(products);

    // const total = await ProductModel.countDocuments({
    //   category: { $in: [...categories] },
    //   color: { $in: [...colors] },
    //   seller: { $in: [...sellers] },
    //   title: { $regex: search, $options: "i" },
    // });

    const response: any = {
      // total,
      // pages: Math.ceil(total / limit),
      // page: page + 1,
      // limit,
      products,
    };

    return response;
  }
  async defects(query: ProductQueryDTO): Promise<IProduct[]> {
    const page = parseInt(query.page) - 1 || 0;
    const limit = parseInt(query.limit) || 15;
    const search = query.search || "";
    const sort = query.sort == "asc" ? "asc" : "desc" || "desc";

    const products: IProduct[] = await ProductModel.find({
      title: { $regex: search, $options: "i" },
      $or: [{ color: { $exists: false } }, { category: { $exists: false } }, { seller: { $exists: false } }],
    })
      .skip(page * limit)
      .limit(limit)
      .sort({ updatedAt: sort == "asc" ? 1 : -1 })
      .populate("color")
      .populate("category")
      .populate("seller", "sellerTitle")
      .lean();

    const total = await ProductModel.countDocuments({
      title: { $regex: search, $options: "i" },
      $or: [{ color: { $exists: false } }, { category: { $exists: false } }, { seller: { $exists: false } }],
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

    const deletedProduct: any = await ProductModel.deleteOne({ _id: product?._id });
    if (!deletedProduct.deletedCount) throw createHttpError.InternalServerError();
    product?.img !== process.env.DEFAULT_IMG_PRODUCT ? fs.unlinkSync(path.join(process.cwd(), "public", String(product?.img))) : false;
    await BuyAndSellModel.deleteMany({ product: productID.id });
    return true;
  }

  async checkExistProduct(productID: ObjectIdDTO): Promise<FindDoc<IProduct>> {
    const product: FindDoc<IProduct> = await ProductModel.findById(productID.id).lean();
    if (!product) throw createHttpError.NotFound(ProductMessage.NotFound);
    return product;
  }
  async checkExistProductDKPC(dkpc: any): Promise<FindDoc<IProduct>> {
    const product: FindDoc<IProduct> = await ProductModel.findOne({ dkpc: dkpc.dkpc });
    if (product) throw createHttpError.Conflict(ProductMessage.Conflict);
    return product;
  }
}
export default new ProductService();
