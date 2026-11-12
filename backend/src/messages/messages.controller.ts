import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messages: MessagesService) {}

  // Public: the contact form posts here.
  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.messages.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/all')
  findAll() {
    return this.messages.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/read')
  markRead(@Param('id') id: string, @Body() body: { read?: boolean }) {
    return this.messages.setRead(id, body.read ?? true);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messages.remove(id);
  }
}
