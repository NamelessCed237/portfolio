import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  slug: string;

  @IsObject()
  title: Record<string, string>;

  @IsObject()
  excerpt: Record<string, string>;

  @IsObject()
  content: Record<string, string>;

  @IsOptional()
  @IsString()
  cover?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

export class UpdateBlogDto extends CreateBlogDto {}
