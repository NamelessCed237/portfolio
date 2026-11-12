import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  // ---- Public ----
  @Get()
  findPublic() {
    return this.projects.findPublic();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.projects.findBySlug(slug);
  }

  // ---- Admin (JWT protected) ----
  @UseGuards(JwtAuthGuard)
  @Get('admin/all')
  findAll() {
    return this.projects.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.projects.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projects.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projects.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projects.remove(id);
  }
}
