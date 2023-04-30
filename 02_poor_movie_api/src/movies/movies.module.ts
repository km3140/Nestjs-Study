import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  // dependency injection
  controllers: [MoviesController],
  //              👇👆 두 파일은 내부적으로 module.ts 파일에 같이 있는 것(엄밀히 하면 app.module.ts로 모임)
  providers: [MoviesService],
})
export class MoviesModule {}
