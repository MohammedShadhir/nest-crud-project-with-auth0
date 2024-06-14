import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getDog(): string {
    return 'hello Dog';
  }
  getCat(): string {
    return 'hello cat';
  }
}
