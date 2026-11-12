import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  findPublic() {
    return this.prisma.blogPost.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    });
  }

  findAll() {
    return this.prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { slug } });
    if (!post) throw new NotFoundException('Article introuvable');
    return post;
  }

  async findOne(id: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Article introuvable');
    return post;
  }

  private withPublishedAt(dto: CreateBlogDto, current?: { publishedAt: Date | null }) {
    const data: Prisma.BlogPostUncheckedCreateInput = { ...(dto as any) };
    if (dto.published && !current?.publishedAt) data.publishedAt = new Date();
    if (dto.published === false) data.publishedAt = null;
    return data;
  }

  create(dto: CreateBlogDto) {
    return this.prisma.blogPost.create({ data: this.withPublishedAt(dto) });
  }

  async update(id: string, dto: UpdateBlogDto) {
    const current = await this.findOne(id);
    return this.prisma.blogPost.update({
      where: { id },
      data: this.withPublishedAt(dto, current),
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.blogPost.delete({ where: { id } });
    return { ok: true };
  }
}
