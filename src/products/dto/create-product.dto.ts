import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(300)
  description: string;

  @Min(0)
  @IsNumber({ maxDecimalPlaces: 4 })
  @Type(() => Number)
  price: number;

  @Min(0)
  @IsNumber({ maxDecimalPlaces: 4 })
  @Type(() => Number)
  descount_price: number;

  @IsString()
  image: string;

  @IsNumber()
  @Min(0)
  stock_quantity: number;
}
