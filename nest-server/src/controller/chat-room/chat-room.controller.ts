import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import {TokenService} from '../../token/token.service';
import {Request} from 'express';
import {AuthGuard, CustomRequest} from '../../auth/auth-guard';

@Controller('chat-room')
@UseGuards(AuthGuard)
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService,
              private tokenSvc: TokenService) {}

  @Post()
  create(@Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatRoomService.create(createChatRoomDto);
  }

  @Get()
  findAll(@Req() req: CustomRequest) {
    console.info(req.userId);
    return this.chatRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatRoomDto: UpdateChatRoomDto) {
    return this.chatRoomService.update(+id, updateChatRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatRoomService.remove(+id);
  }
}
