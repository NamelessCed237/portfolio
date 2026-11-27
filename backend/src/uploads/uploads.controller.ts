import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
      fileFilter: (_req, file, cb) => {
        const mimeOk = /^(image\/(png|jpe?g|pjpeg|webp|gif|svg\+xml|avif|heic|heif|bmp|x-icon|vnd\.microsoft\.icon)|application\/pdf)$/i.test(
          file.mimetype,
        );
        const extOk = /\.(png|jpe?g|webp|gif|svg|avif|heic|heif|bmp|ico|pdf)$/i.test(
          file.originalname || '',
        );
        const ok = mimeOk || (file.mimetype === 'application/octet-stream' && extOk);
        cb(ok ? null : new BadRequestException('Type de fichier non autorisé'), ok);
      },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    if (!file) throw new BadRequestException('Aucun fichier');

    const saved = await this.prisma.uploadedFile.create({
      data: {
        filename: file.originalname || 'file',
        mimeType: file.mimetype,
        size: file.size,
        data: file.buffer,
      },
      select: { id: true, filename: true },
    });

    // PUBLIC_API_URL explicitly, else Render's injected URL, else current request host.
    const rawBase =
      process.env.PUBLIC_API_URL?.trim() ||
      process.env.RENDER_EXTERNAL_URL?.trim() ||
      `${req.protocol}://${req.get('host')}`;
    const base = rawBase.replace(/\/+$/, '');
    return {
      url: `${base}/api/uploads/${saved.id}`,
      name: saved.filename,
    };
  }

  @Get(':id')
  async serve(
    @Param('id') id: string,
    @Query('download') download: string | undefined,
    @Res() res: Response,
  ) {
    const file = await this.prisma.uploadedFile.findUnique({ where: { id } });
    if (!file || !file.data) throw new NotFoundException('Fichier introuvable');

    const safeName = file.filename.replace(/[\r\n"]/g, '_').trim() || 'file';
    const isDownload = download === '1' || download === 'true';

    res.setHeader('Content-Type', file.mimeType);
    res.setHeader('Content-Length', String(file.size));
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader(
      'Content-Disposition',
      `${isDownload ? 'attachment' : 'inline'}; filename="${safeName}"`,
    );

    return res.send(Buffer.from(file.data));
  }
}

