import { errorHandler } from "../../common/exception/error.handler";
import { ProductDTO } from "./product.dto";
import { ProductModel } from "./product.model";
import { IProduct } from "./product.types";

class ProductService {
  async create(productDto: ProductDTO): Promise<IProduct> {
    errorHandler(productDto);
    const product: IProduct = await ProductModel.create(productDto);
    return product;
  }
}
export default new ProductService();
