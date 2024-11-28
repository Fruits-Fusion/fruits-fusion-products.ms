import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description: string;

  @IsBoolean()
  enabled: boolean;

  @IsString()
  @IsOptional()
  image?: string;

  @IsPositive()
  @IsOptional()
  stock_quantity?: number;

  @IsNumber()
  @Min(0)
  price: number;
}
