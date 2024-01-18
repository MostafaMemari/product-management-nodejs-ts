import { Expose } from "class-transformer";
import { IsDefined, IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional } from "class-validator";

export class UserDTO {
  @IsDefined()
  @Expose()
  @IsString()
  fullName: string;

  @IsDefined()
  @Expose()
  @IsString()
  username: string;

  @IsDefined()
  @Expose()
  @IsEmail()
  email: string;

  @IsOptional()
  @Expose()
  @IsEmail()
  role: string;

  @IsDefined()
  @Expose()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  password: string;

  @IsDefined()
  @Expose()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  confirmPassword: string;
}
export class UserLoginDTO {
  @IsDefined()
  @Expose()
  @IsString()
  identifier: string;

  @IsDefined()
  @Expose()
  @IsString()
  password: string;
}
