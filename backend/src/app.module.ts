import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { ServicesModule } from './services/services.module';
import { ExperienceModule } from './experience/experience.module';
import { BlogModule } from './blog/blog.module';
import { MessagesModule } from './messages/messages.module';
import { UploadsModule } from './uploads/uploads.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    SkillsModule,
    ServicesModule,
    ExperienceModule,
    BlogModule,
    MessagesModule,
    UploadsModule,
    SettingsModule,
  ],
})
export class AppModule {}
