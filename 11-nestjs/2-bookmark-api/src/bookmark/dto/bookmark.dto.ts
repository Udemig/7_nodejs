import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BookmarkDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsNotEmpty({ groups: ['create'] })
  @IsOptional({ groups: ['update'] })
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @IsNotEmpty({ groups: ['create'] })
  @IsOptional({ groups: ['update'] })
  description: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  link?: string;
}
