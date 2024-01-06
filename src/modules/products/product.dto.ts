import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsString, IsNumber, Matches, IsOptional, IsArray } from "class-validator";
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

  @Expose()
  @IsNumber()
  price: number;

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

export class ProductUpdateDTO {
  @Expose()
  @IsOptional()
  @IsString()
  title: string;

  @Expose()
  @IsOptional()
  dkp: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  dkpc: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  price: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  width: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  height: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  count: number;

  @Expose()
  color: string;

  @Expose()
  category: string;

  @Expose()
  seller: string;
}

export class ProductQueryDTO {
  @IsDefined()
  @Expose()
  @IsString()
  page: string;

  @IsDefined()
  @Expose()
  @IsString()
  limit: string;

  @IsDefined()
  @Expose()
  @IsString()
  search: string;

  @IsDefined()
  @Expose()
  @IsString()
  category: string;

  @IsDefined()
  @Expose()
  @IsString()
  color: string;

  @IsDefined()
  @Expose()
  @IsString()
  sort: string;
}
