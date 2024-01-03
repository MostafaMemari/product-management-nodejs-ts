import createHttpError from "http-errors";
import { errorHandler } from "../../common/exception/error.handler";
import { BuyAndSellDTO, buyAndSellDTO } from "./buy-sell.dto";
import { BuyAndSellModel } from "./buy-sell.model";
import { IBuyAndSell } from "./buy-sell.types";
import { plainToClass } from "class-transformer";
import { getDateNow, getHourNow } from "../../common/utils/dateNormalize";
import { FindDoc, ObjectIdDTO } from "../../types/public.types";
import { ProductDTO } from "../products/product.dto";
import { IProduct } from "../products/product.types";
import { ProductModel } from "../products/product.model";

class BuyAndSellService {
  async create(reqDto: BuyAndSellDTO): Promise<Boolean> {
    reqDto.hour = getHourNow();
    reqDto.date = getDateNow();

    const buyAndSellDto: BuyAndSellDTO = plainToClass(BuyAndSellDTO, reqDto, { excludeExtraneousValues: true });
    errorHandler({ buyAndSellDto });

    const result: IBuyAndSell = await BuyAndSellModel.create(buyAndSellDto);
    if (!result) throw createHttpError.InternalServerError();
    return true;
  }
  async buy(productID: ObjectIdDTO, buyAndSellDto: buyAndSellDTO, productDto: FindDoc<IProduct>) {
    const productDTO: any = { product: productID.id, count: +buyAndSellDto?.count, operation: buyAndSellDto?.operation || "خرید" };

    await this.create(productDTO);

    const countProduct = Number(productDto?.count) + Number(buyAndSellDto.count);
    await ProductModel.updateOne(
      { _id: productID.id },
      {
        count: countProduct,
      }
    );
  }
  async sell(productID: ObjectIdDTO, count: buyAndSellDTO, productDto: FindDoc<IProduct>) {
    const productDTO: any = { product: productID.id, count: +count.count, operation: "فروش" };
    await this.create(productDTO);

    const countProduct = Number(productDto?.count) - Number(count.count);
    await ProductModel.updateOne(
      { _id: productID.id },
      {
        count: countProduct,
      }
    );
  }
  async depo(productID: ObjectIdDTO, count: buyAndSellDTO, productDto: FindDoc<IProduct>) {
    const productDTO: any = { product: productID.id, count: +count.count, operation: "دپو" };
    await this.create(productDTO);

    const countProduct = Number(productDto?.count) - Number(count.count);
    await ProductModel.updateOne(
      { _id: productID.id },
      {
        count: countProduct,
      }
    );
  }
}
export default new BuyAndSellService();
