import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Res, Req} from '@nestjs/common';
import { FrendService } from './frend.service';
import {Frend, Frends} from './entities/frend.entity';
import {RuntimeException} from '@nestjs/core/errors/exceptions/runtime.exception';
import {NotFoundError} from 'rxjs';
import {AuthGuard} from '../../auth/auth-guard';
import {Request} from 'express';

@Controller('frends')
@UseGuards(AuthGuard)
export class FrendsController {
  constructor(private readonly frendService: FrendService) {}

  /**
   * 친구신청
   * @param createFrendDto.state = 0 => 친구신청
   */
  @Post()
  create(@Body() createFrendDto: Frend) {
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
  async findMyFrend(@Req() req: Request, @Param('id') id: string) {
    const f: Frends = {
      frends: await this.frendService.findMyFrend(id)
    }
    return f;
  }

  /**
   * id를 통해 나한테 친구 신청한 목록을 가지고 온다.
   */
  @Get('accept-list/:id')
  async findAcceptFrendListById(@Param('id') id: string) {
    const f: Frends = {
      frends: await this.frendService.findAcceptFrendListById(id)
    }
    return f;
  }

  /**
   * 친구신청
   * @param createFrendDto.state = 1 => 친구승인
   * @param createFrendDto.state = 2 => 친구취소
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFrendDto: Frend) {
    console.info(`친구 신청 결과 ===? id: ${id}, ${ JSON.stringify(updateFrendDto) }`)
    return this.frendService.update(+id, updateFrendDto);
  }

  /**
   * 친구삭제
   */
  @Delete()
  remove(@Query('userId') userId, @Query('frendId') frendId) {
    console.info(`삭제 : userId = ${userId}, frendId = ${frendId}`)
    return this.frendService.remove({
      userId,
      frendId
    });
  }
}
