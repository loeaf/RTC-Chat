import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInteractiveDto } from './create-user-interactive.dto';

export class UpdateUserInteractiveDto extends PartialType(CreateUserInteractiveDto) {
  id: number;
}
