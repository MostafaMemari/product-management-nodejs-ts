import createHttpError from "http-errors";
import { errorHandler } from "../../common/exception/error.handler";
import { FindDoc, ObjectIdDTO } from "../../types/public.types";
import { ProductDTO, ProductUpdateDTO } from "./product.dto";
import { ProductModel } from "./product.model";
import { IProduct } from "./product.types";
import { ProductMessage } from "./product.message";

class ProductService {
  async create(productDto: ProductDTO): Promise<IProduct> {
    errorHandler({ productDto });
    const product: IProduct = await ProductModel.create(productDto);
    return product;
  }
  async update(productID: ObjectIdDTO, productDto: ProductUpdateDTO): Promise<boolean> {
    console.log({ productID, productDto });
    errorHandler({ productID, productDto });

    await this.checkExistProduct(productID);

    const result: any = await ProductModel.updateOne({ _id: productID.id }, { ...productDto });
    if (!result.modifiedCount) throw createHttpError.InternalServerError();
    return true;
  }
  async findByID(productID: ObjectIdDTO): Promise<FindDoc<IProduct>> {
    errorHandler({ productID });
    return await this.checkExistProduct(productID);
  }
  async find(): Promise<IProduct[]> {
    const product: IProduct[] = await ProductModel.find({});
    return product;
  }
  async removeByID(productID: ObjectIdDTO): Promise<boolean> {
    errorHandler({ productID });
    const product = await this.checkExistProduct(productID);
    const deletedProduct: any = await ProductModel.deleteOne({ _id: product?.id });
    if (!deletedProduct.deletedCount) throw createHttpError.InternalServerError();
    return true;
  }
  async checkExistProduct(productID: ObjectIdDTO): Promise<FindDoc<IProduct>> {
    const product: FindDoc<IProduct> = await ProductModel.findById(productID.id);
    if (!product) throw createHttpError.NotFound(ProductMessage.NotFound);
    return product;
  }
}
export default new ProductService();
