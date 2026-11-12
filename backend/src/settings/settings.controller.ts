import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly prisma: PrismaService) {}

  /** Public: returns all settings as a { key: value } map. */
  @Get()
  async all() {
    const rows = await this.prisma.setting.findMany();
    return rows.reduce<Record<string, unknown>>((acc, r) => {
      acc[r.key] = r.value;
      return acc;
    }, {});
  }

  @Get(':key')
  async one(@Param('key') key: string) {
    const row = await this.prisma.setting.findUnique({ where: { key } });
    return { key, value: row?.value ?? null };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':key')
  set(@Param('key') key: string, @Body() body: { value: unknown }) {
    return this.prisma.setting.upsert({
      where: { key },
      update: { value: body.value as object },
      create: { key, value: body.value as object },
    });
  }
}
