import { Injectable } from '@nestjs/common';
import { CreateUserInteractiveDto } from './dto/create-user-interactive.dto';
import { UpdateUserInteractiveDto } from './dto/update-user-interactive.dto';

@Injectable()
export class UserInteractiveService {
  create(createUserInteractiveDto: CreateUserInteractiveDto) {
    return 'This action adds a new userInteractive';
  }

  findAll() {
    return `This action returns all userInteractive`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userInteractive`;
  }

  update(id: number, updateUserInteractiveDto: UpdateUserInteractiveDto) {
    return `This action updates a #${id} userInteractive`;
  }

  remove(id: number) {
    return `This action removes a #${id} userInteractive`;
  }
}
