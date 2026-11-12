import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Public list — published only, ordered. */
  findPublic() {
    return this.prisma.project.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  }

  /** Admin list — everything. */
  findAll() {
    return this.prisma.project.findMany({ orderBy: { order: 'asc' } });
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({ where: { slug } });
    if (!project) throw new NotFoundException('Projet introuvable');
    return project;
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Projet introuvable');
    return project;
  }

  create(dto: CreateProjectDto) {
    return this.prisma.project.create({ data: dto as Prisma.ProjectCreateInput });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.prisma.project.update({
      where: { id },
      data: dto as Prisma.ProjectUpdateInput,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
    return { ok: true };
  }
}
