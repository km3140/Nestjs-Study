import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  //                                        👆 비즈니스 로직(함수들)이 담겨있는 파일

  @Get()
  getHello(): string {
    return this.appService.getHello();
    //      👆 컨트롤러에선 앱서비스에 구성해놓은 로직(함수)들의 실행값을 리턴만
  }

  @Get('/hi')
  sayHello(): string {
    return this.appService.getHi();
  }
}
