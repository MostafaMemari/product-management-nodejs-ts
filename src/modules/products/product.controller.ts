import { NextFunction, Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { StatusCodes } from "http-status-codes";
import autoBind from "auto-bind";
import fs from "fs";
import path from "path";

import { ProductDTO, ProductQueryDTO, ProductRobotDTO, ProductUpdateDTO } from "./product.dto";
import productService from "./product.service";
import { ProductMessage } from "./product.message";
import { ObjectIdDTO } from "../../types/public.types";
import ColorService from "../color/color.service";
import { IColor } from "../color/color.types";
import CategoryService from "../category/category.service";
import { ICategory } from "../category/category.types";
import { stringToNumber } from "../../common/utils/functions";
import SellerService from "../seller/seller.service";
import BuyAndSellService from "../buy-sell/buy-sell.service";
import { ISeller } from "../seller/seller.types";

export class ProductController {
  private service = productService;
  private colorService = ColorService;
  private categoryService = CategoryService;
  private sellerService = SellerService;
  private buyAndSellService = BuyAndSellService;

  constructor() {
    autoBind(this);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      stringToNumber(req.body);
      const productDto: ProductDTO = plainToClass(ProductDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
      productDto.color ? await this.colorService.checkExistColor({ id: productDto.color }) : false;
      productDto.category ? await this.categoryService.checkExistCategory({ id: productDto.category }) : false;
      productDto.seller ? await this.sellerService.checkExistSeller({ id: productDto.seller }) : false;

      await this.service.create(productDto, req.file);

      res.status(StatusCodes.CREATED).json({
        status: StatusCodes.CREATED,
        message: ProductMessage.Created,
      });
    } catch (error) {
      req.body.imgUrl ? fs.unlinkSync(path.join(process.cwd(), "public", req.body.imgUrl)) : next(error);
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      stringToNumber(req.body);
      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });
      const productDto: ProductUpdateDTO = plainToClass(ProductUpdateDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
      productDto.color ? await this.colorService.checkExistColor({ id: productDto.color }) : false;
      productDto.category ? await this.categoryService.checkExistCategory({ id: productDto.category }) : false;
      productDto.seller ? await this.sellerService.checkExistSeller({ id: productDto.seller }) : false;

      await this.service.update(productID, productDto, req.file);

      res.status(StatusCodes.OK).json({
        message: ProductMessage.Updated,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const productDto: ProductRobotDTO = plainToClass(ProductRobotDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });

      await this.service.updateRobot(productID, productDto);

      res.status(StatusCodes.OK).json({
        message: ProductMessage.Updated,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req: Request, res: Response, next: NextFunction) {
    try {
      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

      const product = await this.service.findByID(productID);
      res.status(StatusCodes.OK).json({
        data: { product },
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();
      const sellers: ISeller[] = await this.sellerService.find();

      const response: any = await this.service.find(query, req.params, colors, categories, sellers);

      // for (const product of response.products) {
      //   const result = await this.buyAndSellService.sumCountAllAndMonthBuyOrSell(product._id.toString(), req.params.buyAndSell as "buy" | "sell");
      //   product.reportBuy = result;
      // }

      res.status(StatusCodes.OK).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async defects(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });

      const response: any = await this.service.defects(query);

      res.status(StatusCodes.OK).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeByID(req: Request, res: Response, next: NextFunction) {
    try {
      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

      await this.service.removeByID(productID);
      res.status(StatusCodes.OK).json({
        message: ProductMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }

<<<<<<< HEAD
  // async findAllProductAndSumSellBuy(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
  //     const colors: IColor[] = await this.colorService.find();
  //     const categories: ICategory[] = await this.categoryService.find();
  //     const sellers: ISeller[] = await this.sellerService.find();

  //     const response: any = await this.service.find(query, colors, categories, sellers);

  //     for (const product of response.products) {
  //       const result = await this.buyAndSellService.sumCountAllAndMonthBuyOrSell(product._id.toString(), req.params.buyAndSell as "buy" | "sell");
  //       product.reportBuy = result;
  //     }

  //     res.status(StatusCodes.OK).json({
  //       data: response,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
=======
  async findAllProductAndSumSellBuy(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });

      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();
      const sellers: ISeller[] = await this.sellerService.find();

      const response: any = await this.service.findAllProductAndSumSellBuy(query, req.params, colors, categories, sellers);

      res.status(StatusCodes.OK).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
>>>>>>> spaSellBuyProduct
}
export class ProductControllerEJS {
  private service = productService;
  private colorService = ColorService;
  private categoryService = CategoryService;
  private sellerService = SellerService;
  constructor() {
    autoBind(this);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      stringToNumber(req.body);
      const productDto: ProductDTO = plainToClass(ProductDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
      productDto.color ? await this.colorService.checkExistColor({ id: productDto.color }) : false;
      productDto.category ? await this.categoryService.checkExistCategory({ id: productDto.category }) : false;
      productDto.seller ? await this.sellerService.checkExistSeller({ id: productDto.seller }) : false;

      await this.service.create(productDto, req.file);

      req.flash("success", ProductMessage.Created);
      res.redirect("/panel/products");
    } catch (error) {
      req.flash("error", ProductMessage.ErrorCreate);
      res.redirect("/panel/products");
      // next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      stringToNumber(req.body);
      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const productDto: ProductUpdateDTO = plainToClass(ProductUpdateDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
      productDto.color ? await this.colorService.checkExistColor({ id: productDto.color }) : false;
      productDto.category ? await this.categoryService.checkExistCategory({ id: productDto.category }) : false;
      productDto.seller ? await this.sellerService.checkExistSeller({ id: productDto.seller }) : false;

      await this.service.update(productID, productDto, req.file);

      req.flash("success", ProductMessage.Updated);
      res.redirect("/panel/products");
    } catch (error) {
      req.flash("error", ProductMessage.ErrorUpdate);
      res.redirect("/panel/products");
      // next(error);
    }
  }
  async updateRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const productDto: ProductRobotDTO = plainToClass(ProductRobotDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });

      await this.service.updateRobot(productID, productDto);

      req.flash("success", ProductMessage.Updated);
      res.redirect("/panel/robot");
    } catch (error) {
      req.flash("error", ProductMessage.ErrorUpdate);
      res.redirect("/panel/products");
      // next(error);
    }
  }
}
