import createHttpError from "http-errors";
import { errorHandler } from "../../common/exception/error.handler";
import { BuyAndSellDTO } from "./buy-sell.dto";
import { BuyAndSellModel } from "./buy-sell.model";
import { IBuyAndSell } from "./buy-sell.types";
import { plainToClass } from "class-transformer";
import { getDateNow, getHourNow } from "../../common/utils/dateNormalize";

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
}
export default new BuyAndSellService();
