import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsString, IsNumber, Matches, IsOptional, IsDate, IsEnum } from "class-validator";

export class BuyAndSellDTO {
  @Expose()
  @IsDefined()
  @Matches(RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i), {
    message: "object id is not valid",
  })
  product: string;
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
  @IsDefined()
  @IsNumber()
  price: number;
  @Expose()
  @IsDefined()
  @IsString()
  operation: string;
}
