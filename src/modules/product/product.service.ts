import { errorHandler } from "../../common/exception/error.handler";
import { FindDoc, ObjectIdDTO } from "../../types/public.types";
import { ProductDTO } from "./product.dto";
import { ProductModel } from "./product.model";
import { IProduct } from "./product.types";

class ProductService {
  async create(productDto: ProductDTO): Promise<IProduct> {
    errorHandler(productDto);
    const product: IProduct = await ProductModel.create(productDto);
    return product;
  }
  async getProduct(productIdDto: ObjectIdDTO): Promise<FindDoc<IProduct>> {
    errorHandler(productIdDto);
    const product: FindDoc<IProduct> = await ProductModel.findById(productIdDto.id);
    return product;
  }
  async getProducts(): Promise<IProduct[]> {
    const product: IProduct[] = await ProductModel.find({});
    return product;
  }
}
export default new ProductService();
