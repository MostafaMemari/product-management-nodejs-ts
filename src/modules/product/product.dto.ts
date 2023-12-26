import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsString, IsNumber, Matches } from "class-validator";
import { ObjectId } from "mongoose";

export class ProductDTO {
  @IsDefined()
  @Expose()
  @IsString()
  title: string;

  @IsDefined()
  @Expose()
  @IsNumber()
  dkp: number;

  @IsDefined()
  @Expose()
  @IsNumber()
  dkpc: number;

  @IsDefined()
  @Expose()
  @IsNumber()
  price: number;

  @IsDefined()
  @Expose()
  @IsNumber()
  count: number;

  @Expose()
  color: string;

  @Expose()
  category: string;

  @Expose()
  seller: string;
}
