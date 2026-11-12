import {
  IsArray,
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  year: string;

  @IsObject()
  category: Record<string, string>;

  @IsObject()
  role: Record<string, string>;

  @IsObject()
  tagline: Record<string, string>;

  @IsObject()
  description: Record<string, string>;

  @IsObject()
  highlights: Record<string, string[]>;

  @IsArray()
  @IsString({ each: true })
  stack: string[];

  @IsOptional()
  @IsString()
  liveUrl?: string;

  @IsOptional()
  @IsString()
  githubUrl?: string;

  @IsString()
  cover: string;

  @IsArray()
  @IsString({ each: true })
  gallery: string[];

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

export class UpdateProjectDto extends CreateProjectDto {}
