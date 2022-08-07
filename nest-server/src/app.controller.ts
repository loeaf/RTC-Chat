import {Controller, Get, NotFoundException, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {RuntimeException} from '@nestjs/core/errors/exceptions/runtime.exception';
import winston, {loggers} from 'winston';
import {LoggerService} from '../logger/LoggerService';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }
}
