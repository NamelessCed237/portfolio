import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blog: BlogService) {}

  @Get()
  findPublic() {
    return this.blog.findPublic();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.blog.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/all')
  findAll() {
    return this.blog.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateBlogDto) {
    return this.blog.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    return this.blog.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blog.remove(id);
  }
}
