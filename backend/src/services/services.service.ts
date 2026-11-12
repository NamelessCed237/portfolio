import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  findPublic() {
    return this.prisma.service.findMany({ where: { published: true }, orderBy: { order: 'asc' } });
  }

  findAll() {
    return this.prisma.service.findMany({ orderBy: { order: 'asc' } });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Service introuvable');
    return service;
  }

  create(dto: CreateServiceDto) {
    return this.prisma.service.create({ data: dto as Prisma.ServiceCreateInput });
  }

  async update(id: string, dto: UpdateServiceDto) {
    await this.findOne(id);
    return this.prisma.service.update({ where: { id }, data: dto as Prisma.ServiceUpdateInput });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.service.delete({ where: { id } });
    return { ok: true };
  }
}
