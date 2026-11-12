import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto, UpdateSkillDto } from './dto/skill.dto';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.skill.findMany({ orderBy: { order: 'asc' } });
  }

  async findOne(id: string) {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) throw new NotFoundException('Compétence introuvable');
    return skill;
  }

  create(dto: CreateSkillDto) {
    return this.prisma.skill.create({ data: dto });
  }

  async update(id: string, dto: UpdateSkillDto) {
    await this.findOne(id);
    return this.prisma.skill.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.skill.delete({ where: { id } });
    return { ok: true };
  }
}
