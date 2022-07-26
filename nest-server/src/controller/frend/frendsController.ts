import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FrendService } from './frend.service';
import {Frend, Frends} from './entities/frend.entity';

@Controller('frends')
export class FrendsController {
  constructor(private readonly frendService: FrendService) {}

  /**
   * 친구신청
   * @param createFrendDto.state = 0 => 친구신청
   */
  @Post()
  create(@Body() createFrendDto: Frend) {
    console.log(createFrendDto);
    return this.frendService.create(createFrendDto);
  }

  @Get()
  findAll() {
    return this.frendService.findAll();
  }

  /**
   * id를 통해 친구목록을 가지고 온다.
   */
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.frendService.findAllById(id);
  }

  /**
   * 친구목록
   */
  @Patch('/frendsByMetaRoom/:id')
  findFrendsByIdAndFrendsId(@Param('id') id: string,
                            @Body() frendsDto: Frends) {
    return this.frendService.findFrendsByIdAndFrendsId(id, frendsDto.frends);
  }

  /**
   * 친구신청
   * @param createFrendDto.state = 1 => 친구승인
   * @param createFrendDto.state = 2 => 친구취소
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFrendDto: Frend) {
    return this.frendService.update(+id, updateFrendDto);
  }

  /**
   * 친구삭제
   */
  @Delete()
  remove(@Body() updateFrendDto: Frend) {
    return this.frendService.remove(updateFrendDto);
  }
}
