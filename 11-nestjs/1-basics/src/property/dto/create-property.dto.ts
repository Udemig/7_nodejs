import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

// DTO: Data Transfer Object
// Client'dan gelen veriyi kontrol etmek için kullanıcaz.
export class CreatePropertyDto {
  @IsString()
  @Length(3, 50)
  @IsOptional({ groups: ['update'] })
  name: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  @IsOptional({ groups: ['update'] })
  location: string;

  @IsNumber()
  @IsPositive()
  @Min(10)
  @Max(999)
  @IsOptional({ groups: ['update'] })
  size: number;

  @IsBoolean()
  @IsOptional()
  isAvailable: boolean;
}
