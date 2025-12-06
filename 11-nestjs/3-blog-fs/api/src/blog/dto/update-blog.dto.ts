import { CreateBlogDto } from "./create-blog.dto";
import { PartialType } from "@nestjs/mapped-types";

// CreateBlog DTO'sundaki bütün özellikleri buraya miras aldık
// Miras alırken Partial ile hepsini opsiyonel yaptık
export class UpdateBlogDto extends PartialType(CreateBlogDto) {}