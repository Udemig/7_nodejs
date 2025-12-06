import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    title:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(2000)
    content: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    image:string

    @IsArray()
    @IsString({each:true})
    @IsOptional()
    tags:string[]
}