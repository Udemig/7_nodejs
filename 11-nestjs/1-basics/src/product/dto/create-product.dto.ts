import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

class CreateProductDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsBoolean()
  isAvailable: boolean;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  description: string;
}

export default CreateProductDto;
