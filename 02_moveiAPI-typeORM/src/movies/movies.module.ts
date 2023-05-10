import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';
import { Movie } from './movies.entity';

@Module({
  //                                   👇 typeORM 3.x.x 업데이트) repo -> entity
  imports: [TypeOrmModule.forFeature([Movie])],
  // dependency injection
  controllers: [MoviesController],
  //              👇👆 두 파일은 내부적으로 module.ts 파일에 같이 있는 것(엄밀히 하면 app.module.ts로 모임)
  providers: [MoviesService, MoviesRepository],
  //                          👆 typeORM 3.x.x 업데이트) 추가, InjectRepository 대신?
})
export class MoviesModule {}
