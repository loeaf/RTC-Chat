import {Controller, Get, NotFoundException} from '@nestjs/common';
import { AppService } from './app.service';
import {RuntimeException} from '@nestjs/core/errors/exceptions/runtime.exception';
import winston, {loggers} from 'winston';
import {LoggerService} from '../logger/LoggerService';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    // try {
    // } catch (e) {
    //   LoggerService.ERROR("dsagasdg", e);
    // }
    // throw new RuntimeException("asdgasdg");
    return this.appService.getHello();
  }

  @Get("/aaa")
  getHello2(): string {
    // try {
    // } catch (e) {
    //   LoggerService.ERROR("dsagasdg", e);
    // }
    throw new RuntimeException("asdgasdg");
    return this.appService.getHello();
  }

}
