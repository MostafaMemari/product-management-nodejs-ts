import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsString, IsNumber, Matches, IsOptional, IsDate, IsEnum } from "class-validator";
import { ObjectId } from "mongoose";

export class BuyAndSellDTO {
  @Expose()
  @IsDefined()
  @Matches(RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i), {
    message: "object id is not valid",
  })
  product: string | ObjectId;
  @Expose()
  @IsDefined()
  @IsString()
  date: string;
  @Expose()
  @IsDefined()
  @IsString()
  hour: string;
  @Expose()
  @IsDefined()
  @IsNumber()
  count: number;
  @Expose()
  @IsOptional()
  @IsNumber()
  price: number;
  @Expose()
  @IsDefined()
  @IsString()
  operation: string;
}

export class buyAndSellDTO {
  @Expose()
  @IsOptional()
  @IsNumber()
  count: number;

  @Expose()
  @IsOptional()
  @IsString()
  operation: string;
}
