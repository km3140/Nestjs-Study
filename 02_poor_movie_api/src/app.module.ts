import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

// 루트 모듈
@Module({
  imports: [],
  controllers: [MoviesController],
  //            👆 nest g(enerate) co(ntroller) -> movies.controllers.ts 생성
  providers: [MoviesService],
  //            👆 nest g(enerate) s(ervice) -> movies.service.ts 생성
})
export class AppModule {}
