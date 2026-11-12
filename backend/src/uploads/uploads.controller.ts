import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const UPLOAD_DIR = './uploads';

@Controller('uploads')
export class UploadsController {
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_DIR,
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname).toLowerCase()}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
      fileFilter: (_req, file, cb) => {
        const ok = /^(image\/(png|jpe?g|webp|gif|svg\+xml)|application\/pdf)$/.test(file.mimetype);
        cb(ok ? null : new BadRequestException('Type de fichier non autorisé'), ok);
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Aucun fichier');
    // PUBLIC_API_URL explicitly, else Render's injected URL, else localhost.
    const base =
      process.env.PUBLIC_API_URL ?? process.env.RENDER_EXTERNAL_URL ?? 'http://localhost:4000';
    return { url: `${base.replace(/\/$/, '')}/uploads/${file.filename}`, name: file.originalname };
  }
}
