import { Expose } from "class-transformer";
import { IsDefined, Matches, isString, IsEmpty, IsString, IsNumber, IsInt, Min } from "class-validator";

export class ProductDTO {
  @IsDefined()
  @Expose()
  @IsString()
  title: string;

  @IsDefined()
  @Expose()
  @IsInt()
  dkp: number;

  @IsDefined()
  @Expose()
  @IsInt()
  dkpc: number;

  @IsDefined()
  @Expose()
  @IsInt()
  price: number;

  @IsDefined()
  @Expose()
  @IsInt()
  count: number;

  @Expose()
  color: string;

  @Expose()
  category: string;

  @Expose()
  seller: string;
}
