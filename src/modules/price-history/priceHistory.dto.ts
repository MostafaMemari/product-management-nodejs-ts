import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsString, IsNumber, Matches, IsOptional } from "class-validator";

export class PriceHistoryDTO {
  @IsDefined()
  @Expose()
  @IsString()
  name: string;
}
export class PriceHistoryQueryDTO {
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
  sort: string;
}
