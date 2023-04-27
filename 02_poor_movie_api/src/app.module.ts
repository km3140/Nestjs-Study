import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';

// 루트 모듈
@Module({
  imports: [],
  controllers: [MoviesController],
  //            👆 nest g(enerate) co(ntroller) -> movies 컨트롤러 생성
  providers: [],
})
export class AppModule {}
