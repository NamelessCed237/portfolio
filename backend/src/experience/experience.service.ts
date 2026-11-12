import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.experience.findMany({ orderBy: { order: 'asc' } });
  }

  async findOne(id: string) {
    const item = await this.prisma.experience.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Entrée introuvable');
    return item;
  }

  create(dto: CreateExperienceDto) {
    return this.prisma.experience.create({ data: dto as Prisma.ExperienceCreateInput });
  }

  async update(id: string, dto: UpdateExperienceDto) {
    await this.findOne(id);
    return this.prisma.experience.update({ where: { id }, data: dto as Prisma.ExperienceUpdateInput });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.experience.delete({ where: { id } });
    return { ok: true };
  }
}
