import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

// 루트 모듈
@Module({
  // 👇 url경로별로 라우터를 분리시킨 것과 비슷
  imports: [MoviesModule],
  controllers: [AppController], // 👈 이 곳에는 AppController만 와야함!
  //            👆 nest g(enerate) co(ntroller) -> movies.controllers.ts 생성
  providers: [], // 👈 이 곳에는 AppService만 와야함!
  //            👆 nest g(enerate) s(ervice) -> movies.service.ts 생성
})
export class AppModule {}
