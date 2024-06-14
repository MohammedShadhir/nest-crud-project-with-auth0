import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorizationGuard } from './authorization/authorization.guard';
import { Roles } from './authorization/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(AuthorizationGuard)
  @Get('/dog')
  getDog(): string {
    return this.appService.getDog();
  }

  @UseGuards(AuthorizationGuard)
  @Roles('admin')
  @Get('/cat')
  getCat(): string {
    return this.appService.getCat();
  }
}
