import createHttpError from "http-errors";
import { errorHandler } from "../../common/exception/error.handler";
import { FindDoc, ObjectIdDTO } from "../../types/public.types";
import { CategoryModel } from "./category.model";
import { ICategory } from "./category.types";
import { CategoryMessage } from "./category.message";
import { CategoryDTO, CategoryUpdateDTO } from "./category.dto";
import { ProductModel } from "../products/product.model";

class CategorySevice {
  async create(categoryDto: CategoryDTO): Promise<ICategory> {
    errorHandler({ categoryDto });
    const category: ICategory = await CategoryModel.create(categoryDto);
    return category;
  }
  async update(categoryID: ObjectIdDTO, categoryDto: CategoryUpdateDTO): Promise<boolean> {
    errorHandler({ categoryID, categoryDto });

    await this.checkExistCategory(categoryID);

    const result: any = await CategoryModel.updateOne({ _id: categoryID.id }, { ...categoryDto });
    if (!result.modifiedCount) throw createHttpError.InternalServerError();
    return true;
  }
  async findByID(categoryID: ObjectIdDTO): Promise<FindDoc<ICategory>> {
    errorHandler({ categoryID });
    return await this.checkExistCategory(categoryID);
  }
  async find(): Promise<ICategory[]> {
    const category: ICategory[] = await CategoryModel.find({}).lean();
    return category;
  }
  async removeByID(categoryID: ObjectIdDTO): Promise<boolean> {
    errorHandler({ categoryID });
    const category = await this.checkExistCategory(categoryID);
    const deleteCategory: any = await CategoryModel.deleteOne({ _id: category?.id });
    if (!deleteCategory.deletedCount) throw createHttpError.InternalServerError();

    await ProductModel.updateMany({ category: categoryID.id }, { $unset: { category: "" } });

    return true;
  }
  async checkExistCategory(CategoryID: ObjectIdDTO): Promise<FindDoc<ICategory>> {
    const Category: FindDoc<ICategory> = await CategoryModel.findById(CategoryID.id);
    if (!Category) throw createHttpError.NotFound(CategoryMessage.NotFound);
    return Category;
  }
}
export default new CategorySevice();
