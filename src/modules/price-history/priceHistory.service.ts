import createHttpError from "http-errors";
import { errorHandler } from "../../common/exception/error.handler";
import { FindDoc, ObjectIdDTO } from "../../types/public.types";
import { IPriceHistory } from "./priceHistory.types";
import { PriceHistoryModel } from "./priceHistory.model";
import { PriceHistoryQueryDTO } from "./priceHistory.dto";

class PriceHistoryService {
  async find(query: PriceHistoryQueryDTO): Promise<IPriceHistory[]> {
    const page = parseInt(query.page) - 1 || 0;
    const limit = parseInt(query.limit) || 15;
    const search = query.search || "";
    const sort = query.sort == "asc" ? "asc" : "desc" || "desc";

    const priceHistory: IPriceHistory[] = await PriceHistoryModel.find({ "product.title": { $regex: search, $options: "i" } })
      .skip(page * limit)
      .limit(limit)
      .sort({ updatedAt: sort == "asc" ? 1 : -1 })
      .populate("mySeller.seller", "sellerTitle")
      .lean();

    const total = await PriceHistoryModel.countDocuments({
      "product.title": { $regex: search, $options: "i" },
    });

    const response: any = {
      total,
      pages: Math.ceil(total / limit),
      page: page + 1,
      limit,
      priceHistory,
    };

    return response;
  }
}
export default new PriceHistoryService();
