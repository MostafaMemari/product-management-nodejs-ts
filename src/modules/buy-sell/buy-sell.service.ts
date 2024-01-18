import createHttpError from "http-errors";
import { errorHandler } from "../../common/exception/error.handler";
import { BuyAndSellDTO, CreateBuyAndSellDTO } from "./buy-sell.dto";
import { BuyAndSellModel } from "./buy-sell.model";
import { IBuyAndSell } from "./buy-sell.types";
import { plainToClass } from "class-transformer";
import { getDateNow, getHourNow } from "../../common/utils/dateNormalize";
import { FindDoc, ObjectIdDTO } from "../../types/public.types";
import { IProduct } from "../products/product.types";
import { ProductModel } from "../products/product.model";
import mongoose, { ObjectId } from "mongoose";

class BuyAndSellService {
  async create(reqDto: CreateBuyAndSellDTO): Promise<Boolean> {
    reqDto.hour = getHourNow();
    reqDto.date = getDateNow();

    const buyAndSellDto: BuyAndSellDTO = plainToClass(CreateBuyAndSellDTO, reqDto, { excludeExtraneousValues: true });
    errorHandler({ buyAndSellDto });

    const result: IBuyAndSell = await BuyAndSellModel.create(buyAndSellDto);
    if (!result) throw createHttpError.InternalServerError();
    return true;
  }

  async buy(productID: ObjectIdDTO, buyAndSellDto: BuyAndSellDTO, productDto: FindDoc<IProduct>) {
    const product: any = {
      product: productID.id,
      count: +buyAndSellDto?.count,
      operation: buyAndSellDto?.operation || "خرید",
      status: "buy",
    };

    if (!!Number(buyAndSellDto?.count <= 0)) throw createHttpError.BadRequest("خرید محصول با خطا مواجه شد");

    await this.create(product);

    const countProduct = Number(productDto?.count) + Number(buyAndSellDto.count);
    await ProductModel.updateOne(
      { _id: productID.id },
      {
        count: countProduct,
      }
    );
  }
  async sell(productID: ObjectIdDTO, buyAndSellDto: BuyAndSellDTO, productDto: FindDoc<IProduct>) {
    const product: any = {
      product: productID.id,
      count: +buyAndSellDto?.count,
      operation: buyAndSellDto?.operation || "فروش",
      status: "sell",
    };

    if (!!Number(buyAndSellDto?.count <= 0)) throw createHttpError.BadRequest("فروش محصول با خطا مواجه شد");
    if (!!Number(buyAndSellDto?.count > Number(productDto?.count))) throw createHttpError.BadRequest("فروش محصول با خطا مواجه شد");

    await this.create(product);

    const countProduct = Number(productDto?.count) - Number(buyAndSellDto.count);
    await ProductModel.updateOne(
      { _id: productID.id },
      {
        count: countProduct,
      }
    );
  }

  async reportSell(productID: ObjectIdDTO): Promise<IBuyAndSell[]> {
    errorHandler({ productID });

    const result: IBuyAndSell[] = await BuyAndSellModel.find({ product: productID.id, status: "sell", operation: { $ne: "خرابی" } })
      .limit(12)
      .sort({ createdAt: -1 });

    return result;
  }
  async reportBuy(productID: ObjectIdDTO): Promise<IBuyAndSell[]> {
    errorHandler({ productID });

    const result: IBuyAndSell[] = await BuyAndSellModel.find({ product: productID.id, status: "buy", operation: { $ne: "خرابی" } })
      .limit(12)
      .sort({ createdAt: -1 });

    return result;
  }

  async sumCountAllAndMonthBuyOrSell(productID: ObjectId, status: "buy" | "sell"): Promise<object> {
    const result = await BuyAndSellModel.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productID.toString()), operation: { $ne: "خرابی" }, status } },
      { $group: { _id: "", sumCountAll: { $sum: "$count" }, products: { $push: "$$ROOT" } } },
      { $unwind: { path: "$products" } },
      { $match: { "products.createdAt": { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) } } },
      { $sort: { "products.createdAt": -1 } },
      { $group: { _id: "", sumCountMonth: { $sum: "$products.count" }, sumCountAll: { $first: "$sumCountAll" }, lastOperation: { $first: "$products" } } },
      { $project: { _id: 0 } },
    ]).then((items) => items[0]);
    return result;
  }
}

export default new BuyAndSellService();

// update Date
// const result = await BuyAndSellModel.find({}).lean();
// for (const product of result) {
//   await BuyAndSellModel.updateOne(
//     { _id: product._id },
//     {
//       $set: {
//         createdAt: new Date(moment.from(product.date, "fa", "YYYY/MM/DD").format("YYYY/MM/DD")),
//       },
//     }
//   );
// }
