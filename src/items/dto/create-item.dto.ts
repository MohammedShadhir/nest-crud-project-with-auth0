import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly price: number;
}
