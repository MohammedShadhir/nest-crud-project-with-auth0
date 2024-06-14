// src/user/dto/create-user.dto.ts

import { IsString, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsString()
  @IsNotEmpty()
  auth0Id: string;
}
