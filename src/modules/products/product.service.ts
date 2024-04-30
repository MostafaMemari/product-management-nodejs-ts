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

  async find(query: ProductQueryDTO, colorsDto: IColor[], categoryDto: ICategory[], sellerDto: ISeller[]): Promise<IProduct[]> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 15;
    const search = query.search || "";
    const skip = (page - 1) * limit;
    const sort = query.sort == "asc" ? "asc" : "desc" || "desc";

    let categoryQuery: any = categoryDto.filter((category) => query?.category?.split(",").includes(category.name));
    let colorQuery: any = colorsDto.filter((color) => query?.color?.split(",").includes(color.name));
    let sellerQuery: any = sellerDto.filter((seller) => query?.seller?.split(",").includes(seller.sellerTitle));

    if (!!categoryQuery.length) {
      categoryQuery = [{ category: { $in: categoryQuery.map((category: any) => category._id) } }];
    } else {
      categoryQuery = [{}];
    }
    if (!!colorQuery.length) {
      colorQuery = [{ color: { $in: colorQuery.map((color: any) => color._id) } }];
    } else {
      colorQuery = [{}];
    }
    if (!!sellerQuery.length) {
      sellerQuery = [{ seller: { $in: sellerQuery.map((seller: any) => seller._id) } }];
    } else {
      sellerQuery = [{}];
    }

    const products: IProduct[] = await ProductModel.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [{ title: { $regex: new RegExp(search, "i") } }],
            },
            {
              $or: categoryQuery,
            },
            {
              $or: colorQuery,
            },
            {
              $or: sellerQuery,
            },
          ],
        },
      },
      {
        $sort: { updatedAt: sort == "asc" ? 1 : -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "buyandsells",
          localField: "_id",
          pipeline: [
            {
              $match: {
                operation: {
                  $ne: "خرابی",
                },
                status: "buy",
              },
            },

            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $facet: {
                lastOperation: [
                  {
                    $group: {
                      _id: null,
                      product: {
                        $first: "$$ROOT",
                      },
                    },
                  },
                ],
                sumCountAll: [
                  {
                    $group: {
                      _id: null,
                      sumCount: {
                        $sum: "$count",
                      },
                    },
                  },
                ],
                sumCountMonth: [
                  {
                    $match: {
                      createdAt: {
                        $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
                      },
                    },
                  },
                  {
                    $group: {
                      _id: null,
                      sumCount: {
                        $sum: "$count",
                      },
                    },
                  },
                ],
              },
            },
            {
              $unwind: "$lastOperation",
            },
            {
              $unwind: "$sumCountAll",
            },
            {
              $unwind: "$sumCountMonth",
            },
            {
              $addFields: {
                lastOperation: "$lastOperation.product",
                sumCountAll: "$sumCountAll.sumCount",
                sumCountMonth: "$sumCountMonth.sumCount",
              },
            },
          ],
          foreignField: "product",
          as: "report",
        },
      },
      {
        $project: {
          robot: 0,
        },
      },
    ]);

    const total = await ProductModel.countDocuments({
      $and: [{ $or: [{ title: { $regex: new RegExp(search, "i") } }] }, { $or: categoryQuery }, { $or: colorQuery }, { $or: sellerQuery }],
    });

    const response: any = {
      total,
      pages: Math.ceil(total / limit),
      page: page,
      limit,
      products,
    };

    return response;
  }
  async findAllProductAndSumSellBuy(
    query: ProductQueryDTO,
    params: any,
    colorsDto: IColor[],
    categoryDto: ICategory[],
    sellerDto: ISeller[]
  ): Promise<IProduct[]> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const search = query.search || "";
    const skip = (page - 1) * limit;
    const sort: 1 | -1 = query.sort == "asc" ? 1 : query.sort == "desc" ? -1 : -1;
    const sortCount: 1 | -1 = query.sortCount == "asc" ? 1 : query.sort == "desc" ? -1 : -1;

    let sortQuery: any = "";

    if (query?.sortCount == "desc" || query?.sortCount == "asc") {
      sortQuery = { count: sortCount };
    } else {
      sortQuery = { updatedAt: sort };
    }

    let categoryQuery: any = categoryDto.filter((category) => query?.category?.split(",").includes(category.name));
    let colorQuery: any = colorsDto.filter((color) => query?.color?.split(",").includes(color.name));
    let sellerQuery: any = sellerDto.filter((seller) => query?.seller?.split(",").includes(seller.sellerTitle));

    let countQuery: Object = "";
    let ltCount: any = Number(query?.ltCount);
    let gtCount: any = Number(query?.gtCount);

    if (ltCount && gtCount) {
      countQuery = [{ count: { $lte: ltCount } }, { count: { $gte: gtCount } }];
    } else if (ltCount) {
      countQuery = [{ count: { $lte: ltCount } }];
    } else if (gtCount) {
      countQuery = [{ count: { $gte: gtCount } }];
    } else {
      countQuery = [{}];
    }

    if (!!categoryQuery.length) {
      categoryQuery = [{ category: { $in: categoryQuery.map((category: any) => category._id) } }];
    } else {
      categoryQuery = [{}];
    }
    if (!!colorQuery.length) {
      colorQuery = [{ color: { $in: colorQuery.map((color: any) => color._id) } }];
    } else {
      colorQuery = [{}];
    }
    if (!!sellerQuery.length) {
      sellerQuery = [{ seller: { $in: sellerQuery.map((seller: any) => seller._id) } }];
    } else {
      sellerQuery = [{}];
    }

    const products: IProduct[] = await ProductModel.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [{ title: { $regex: new RegExp(search, "i") } }],
            },
            {
              $or: categoryQuery,
            },
            {
              $or: colorQuery,
            },
            {
              $or: sellerQuery,
            },
            {
              $or: countQuery,
            },
          ],
        },
      },
      { $sort: sortQuery },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "buyandsells",
          localField: "_id",
          pipeline: [
            {
              $match: {
                operation: {
                  $ne: "خرابی",
                },
                status: params.buyAndSell,
              },
            },

            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $facet: {
                lastOperation: [
                  {
                    $group: {
                      _id: null,
                      product: {
                        $first: "$$ROOT",
                      },
                    },
                  },
                ],
                sumCountAll: [
                  {
                    $group: {
                      _id: null,
                      sumCount: {
                        $sum: "$count",
                      },
                    },
                  },
                ],
                sumCountMonth: [
                  {
                    $match: {
                      createdAt: {
                        $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
                      },
                    },
                  },
                  {
                    $group: {
                      _id: null,
                      sumCount: {
                        $sum: "$count",
                      },
                    },
                  },
                ],
              },
            },
            {
              $unwind: "$lastOperation",
            },
            {
              $unwind: "$sumCountAll",
            },
            {
              $unwind: "$sumCountMonth",
            },
            {
              $addFields: {
                lastOperation: "$lastOperation.product",
                sumCountAll: "$sumCountAll.sumCount",
                sumCountMonth: "$sumCountMonth.sumCount",
              },
            },
          ],
          foreignField: "product",
          as: "report",
        },
      },
      {
        $project: {
          robot: 0,
        },
      },
    ]);

    const total = await ProductModel.countDocuments({
      $and: [{ $or: [{ title: { $regex: new RegExp(search, "i") } }] }, { $or: categoryQuery }, { $or: colorQuery }, { $or: sellerQuery }, { $or: countQuery }],
    });

    const response: any = {
      total,
      pages: Math.ceil(total / limit),
      page: page,
      limit,
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
