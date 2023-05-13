import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //  👇 pipe, express의 미들웨어 같은 것
  app.useGlobalPipes(
    // class-validator, class-transformer 라이브러리 다운
    // 👆 거의 모든 유효성검사를 도움, 👆 페이로드 형변환 도와줌
    //  👇 들어오는 모든 클라이언트 페이로드에 대해 유효성 검사 규칙을 적용하는 편리한 접근 방식을 제공
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // 👆 전송받은 데이터의 타입을 콘트롤러에 명시한 타입으로 변환(url로 들어오는 값은 모두 string임)
      //    덕분에 로직에서 형변환을 시킬 필요가 없어짐, class-transform
    }),
  );

  //                                👇 config폴더 안의 파일들 중 그 안의server객체?를 가져옴
  const serverConfig = config.get('server');
  const port = serverConfig.port;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
  // 👆 nestjs내장 log모듈
}
bootstrap();

// new ValidationPipe() 일때,
// DTO이외에 프로퍼티가 오는 것 허용
// DTO의 프로퍼티 중 하나라도 빠지면 에러(?프로퍼티 제외)

// new ValidationPipe({ whitelist: true }) 일때,
// DTO이외에 프로퍼티가 오면 200대 코드를 주지만 DTO이외의 프로퍼티는 자동으로 걸러져서 들어옴
// DTO의 프로퍼티 중 하나라도 빠지면 에러(?프로퍼티 제외)

// new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }) 일때,
// DTO이외에 프로퍼티가 오면 에러
// DTO의 프로퍼티 중 하나라도 빠지면 에러(?프로퍼티 제외)
