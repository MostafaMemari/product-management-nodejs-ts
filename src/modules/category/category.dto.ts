import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsString, IsOptional } from "class-validator";

export class CategoryDTO {
  @IsDefined()
  @Expose()
  @IsString()
  name: string;
}
export class CategoryUpdateDTO {
  @Expose()
  @IsOptional()
  @IsString()
  name: string;
}
