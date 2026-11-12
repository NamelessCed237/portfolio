import { IsBoolean, IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsObject()
  title: Record<string, string>;

  @IsObject()
  description: Record<string, string>;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

export class UpdateServiceDto extends CreateServiceDto {}
