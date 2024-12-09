import { Query, Controller, Res, Get, Post, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/hello')
  // @HttpCode(400)
  getHello(@Query() query) {
    return this.appService.getHello(query);
  }

  @Post('/api/hello')
  // @HttpCode(400)
  getHelloPost(@Query() query) {
    return this.appService.getHello(query);
  }

  @Get('/api/table/:id')
  getTable(@Query() query) {
    const obj = {
      abc: 1,
    };
    const data = new Array(100).fill(0).map(() => obj);
    return {
      code: 200,
      data,
    };
  }

  @Get('/api/mock')
  getMock(@Query() query) {
    return {
      code: 0,
      data: {
        a: 34,
      },
    };
  }
}
