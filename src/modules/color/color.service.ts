import createHttpError from "http-errors";
import { errorHandler } from "../../common/exception/error.handler";
import { FindDoc, ObjectIdDTO } from "../../types/public.types";
import { ColorModel } from "./color.model";
import { IColor } from "./color.types";
import { ColorMessage } from "./color.message";
import { ColorDTO, ColorUpdateDTO } from "./color.dto";
import { ProductModel } from "../products/product.model";

class ColorService {
  async create(colorDto: ColorDTO): Promise<IColor> {
    errorHandler({ colorDto });
    const color: IColor = await ColorModel.create(colorDto);
    return color;
  }
  async update(colorID: ObjectIdDTO, colorDto: ColorUpdateDTO): Promise<boolean> {
    errorHandler({ colorID, colorDto });

    await this.checkExistColor(colorID);

    const result: any = await ColorModel.updateOne({ _id: colorID.id }, { ...colorDto });
    if (!result.modifiedCount) throw createHttpError.InternalServerError();
    return true;
  }
  async findByID(colorID: ObjectIdDTO): Promise<FindDoc<IColor>> {
    errorHandler({ colorID });
    return await this.checkExistColor(colorID);
  }
  async find(): Promise<IColor[]> {
    const color: IColor[] = await ColorModel.find({}).lean();
    return color;
  }
  async removeByID(colorID: ObjectIdDTO): Promise<boolean> {
    errorHandler({ colorID });
    const color = await this.checkExistColor(colorID);
    const deletedcolor: any = await ColorModel.deleteOne({ _id: color?.id });
    if (!deletedcolor.deletedCount) throw createHttpError.InternalServerError();
    await ProductModel.updateMany({ color: colorID.id }, { $unset: { color: "" } });
    return true;
  }
  async checkExistColor(colorID: ObjectIdDTO): Promise<FindDoc<IColor>> {
    const color: FindDoc<IColor> = await ColorModel.findById(colorID.id);
    if (!color) throw createHttpError.NotFound(ColorMessage.NotFound);
    return color;
  }
}
export default new ColorService();
