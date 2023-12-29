import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsString, IsNumber, Matches, IsOptional } from "class-validator";

export class ColorDTO {
  @IsDefined()
  @Expose()
  @IsString()
  name: string;
}
export class ColorUpdateDTO {
  @Expose()
  @IsOptional()
  @IsString()
  name: string;
}
