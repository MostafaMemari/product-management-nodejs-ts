import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsString, IsNumber, Matches, IsOptional, IsArray, IsBoolean, IsMongoId } from "class-validator";
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
  width: number;

  @IsDefined()
  @Expose()
  @IsNumber()
  height: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  count: number;

  @IsOptional()
  @Expose()
  @IsString()
  imgUrl: string;

  @Expose()
  @IsDefined()
  @IsMongoId()
  color: ObjectId;

  @Expose()
  @IsDefined()
  @IsMongoId()
  category: ObjectId;

  @Expose()
  @IsDefined()
  @IsMongoId()
  seller: ObjectId;
}

export class ProductUpdateDTO {
  @Expose()
  @IsOptional()
  @IsString()
  title: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  dkp: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  dkpc: number;

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

  @IsOptional()
  @IsMongoId()
  @Expose()
  color: ObjectId;

  @IsOptional()
  @IsMongoId()
  @Expose()
  category: ObjectId;

  @IsOptional()
  @IsMongoId()
  @Expose()
  seller: ObjectId;
}
export class ProductRobotDTO {
  @Expose()
  @IsOptional()
  @IsNumber()
  reducePrice: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  maxPrice: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  minPrice: number;

  @Expose()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @Expose()
  @IsOptional()
  @IsBoolean()
  isBuyBox: boolean;

  @Expose()
  @IsOptional()
  @IsBoolean()
  isCheckPrice: boolean;
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
  seller: string;

  @IsDefined()
  @Expose()
  @IsString()
  sort: string;
}
