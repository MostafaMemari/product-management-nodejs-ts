import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class SellerDTO {
  @IsDefined()
  @Expose()
  @IsNumber()
  sellerID: number;

  @IsDefined()
  @Expose()
  @IsString()
  sellerTitle: string;

  @IsDefined()
  @Expose()
  @IsString()
  token: string;

  @IsOptional()
  @Expose()
  @IsString()
  accessTokenDigiKala: string;

  @IsOptional()
  @Expose()
  @IsBoolean()
  isRobot: boolean;
}
export class SellerUpdateDTO {
  @IsOptional()
  @Expose()
  @IsNumber()
  sellerID: number;

  @IsOptional()
  @Expose()
  @IsString()
  sellerTitle: string;

  @IsOptional()
  @Expose()
  @IsString()
  accessTokenDigiKala: string;

  @IsOptional()
  @Expose()
  @IsString()
  token: string;

  @IsOptional()
  @Expose()
  @IsBoolean()
  isRobot: boolean;
}
