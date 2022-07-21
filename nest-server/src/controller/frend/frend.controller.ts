import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FrendService } from './frend.service';
import {Frend} from './entities/frend.entity';

@Controller('frend')
export class FrendController {
  constructor(private readonly frendService: FrendService) {}

  @Post()
  create(@Body() createFrendDto: Frend) {
    console.log(createFrendDto);
    return this.frendService.create(createFrendDto);
  }

  @Get()
  findAll() {
    return this.frendService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.frendService.findAllById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFrendDto: Frend) {
    return this.frendService.update(+id, updateFrendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frendService.remove(+id);
  }
}
