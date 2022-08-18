import {WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer} from '@nestjs/websockets';
import { UserInteractiveService } from './user-interactive.service';
import { CreateUserInteractiveDto } from './dto/create-user-interactive.dto';
import { UpdateUserInteractiveDto } from './dto/update-user-interactive.dto';
import {Server} from 'socket.io';

@WebSocketGateway(3010)
export class UserInteractiveGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly userInteractiveService: UserInteractiveService) {
  }

  @SubscribeMessage('createUserInteractive')
  create(@MessageBody() createUserInteractiveDto: CreateUserInteractiveDto) {
    return this.userInteractiveService.create(createUserInteractiveDto);
  }

  @SubscribeMessage('findAllUserInteractive')
  findAll() {
    return this.userInteractiveService.findAll();
  }

  @SubscribeMessage('findOneUserInteractive')
  findOne(@MessageBody() id: number) {
    return this.userInteractiveService.findOne(id);
  }

  @SubscribeMessage('updateUserInteractive')
  update(@MessageBody() updateUserInteractiveDto: UpdateUserInteractiveDto) {
    return this.userInteractiveService.update(updateUserInteractiveDto.id, updateUserInteractiveDto);
  }

  @SubscribeMessage('removeUserInteractive')
  remove(@MessageBody() id: number) {
    return this.userInteractiveService.remove(id);
  }
}
