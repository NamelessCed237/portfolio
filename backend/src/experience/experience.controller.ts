import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experience: ExperienceService) {}

  @Get()
  findPublic() {
    return this.experience.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/all')
  findAll() {
    return this.experience.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateExperienceDto) {
    return this.experience.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.experience.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experience.remove(id);
  }
}
