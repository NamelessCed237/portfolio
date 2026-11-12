import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsInt()
  level?: number;

  @IsOptional()
  @IsInt()
  order?: number;
}

export class UpdateSkillDto extends CreateSkillDto {}
