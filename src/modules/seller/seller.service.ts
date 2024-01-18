import createHttpError from "http-errors";
import { errorHandler } from "../../common/exception/error.handler";
import { FindDoc, ObjectIdDTO } from "../../types/public.types";
import { SellerModel } from "./seller.model";
import { ISeller } from "./seller.types";
import { SellerMessage } from "./seller.message";
import { SellerDTO, SellerUpdateDTO } from "./seller.dto";
import { ProductModel } from "../products/product.model";

class SellerSevice {
  async create(sellerDto: SellerDTO): Promise<ISeller> {
    const checkExistSeller = await this.checkExistSellerID(sellerDto.sellerID);
    if (checkExistSeller) throw createHttpError.Conflict("ثبت فروشنده با خطا مواجه شد");

    errorHandler({ sellerDto });
    const seller: ISeller = await SellerModel.create(sellerDto);
    return seller;
  }
  async update(sellerID: ObjectIdDTO, sellerDto: SellerUpdateDTO): Promise<boolean> {
    errorHandler({ sellerID, sellerDto });

    await this.checkExistSeller(sellerID);

    const result: any = await SellerModel.updateOne({ _id: sellerID.id }, { ...sellerDto });

    if (!result.modifiedCount) throw createHttpError.InternalServerError();
    return true;
  }
  async findByID(sellerID: ObjectIdDTO): Promise<FindDoc<ISeller>> {
    errorHandler({ sellerID });
    return await this.checkExistSeller(sellerID);
  }
  async find(): Promise<ISeller[]> {
    const seller: ISeller[] = await SellerModel.find({}).lean();
    return seller;
  }
  async removeByID(sellerID: ObjectIdDTO): Promise<boolean> {
    errorHandler({ sellerID });
    const seller = await this.checkExistSeller(sellerID);
    const deleteSeller: any = await SellerModel.deleteOne({ _id: seller?.id });
    if (!deleteSeller.deletedCount) throw createHttpError.InternalServerError();

    await ProductModel.updateMany({ Seller: sellerID.id }, { $unset: { Seller: "" } });

    return true;
  }
  async checkExistSeller(sellerID: ObjectIdDTO): Promise<FindDoc<ISeller>> {
    const Seller: FindDoc<ISeller> = await SellerModel.findById(sellerID.id);
    if (!Seller) throw createHttpError.NotFound(SellerMessage.NotFound);
    return Seller;
  }
  async checkExistSellerID(sellerID: number): Promise<FindDoc<ISeller>> {
    const Seller: FindDoc<ISeller> = await SellerModel.findOne({ sellerID });
    return Seller;
  }
}
export default new SellerSevice();
