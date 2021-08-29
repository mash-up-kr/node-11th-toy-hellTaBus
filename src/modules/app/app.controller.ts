import {Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hi')
  sayHello(): string {
    return 'hi';
  }

  @Post('/hi')
  postHello(): string {
    return 'post hi';
  }
}
