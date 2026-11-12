import { IsArray, IsIn, IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateExperienceDto {
  @IsIn(['work', 'education'])
  kind: string;

  @IsObject()
  title: Record<string, string>;

  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsString()
  period: string;

  @IsObject()
  description: Record<string, string>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsInt()
  order?: number;
}

export class UpdateExperienceDto extends CreateExperienceDto {}
