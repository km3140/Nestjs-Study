import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
//       👆 타입만 import
import { Movie } from './entites/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';

//            👇 해당 컨트롤러의 엔트리 포인트
@Controller('movies')
export class MoviesController {
  //                                           👇 type만 import했음, service는 안함
  constructor(private readonly moviesService: MoviesService) {}
  //                           👆 service는 import 하지 않았는데 service를 사용할 수 있는 이유 => dependency injection
  //                              내부적으로 콘트롤러와 서비스는 모듈파일 안에 같이 존재한다

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // // 👇 search가 Get(':id') 보다 아래에 있다면 search가 파라미터로 인식됨, express와 마찬가지
  // @Get('search')
  // search(@Query('year') searchingYear: string) {
  //   //   👆 url의 쿼리를 가져옴 (?year=2000)
  //   return `We are searching for a movie made after: ${searchingYear}`;
  // }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    //   👆 파라미터 요청 후 사용해야한다
    //      id파라미터를 movieId 이름으로 사용
    return this.moviesService.getOne(movieId);
  }

  // ex) Body = {"title":"Tenet", "year":2020, "genres": ["action", "mind blown"]}
  @Post()
  create(@Body() movieData: CreateMovieDto) {
    //    👆 Body 가져오기
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  // @Patch()
  // put은 모든 리소스를 업데이트, patch는 리소스의 일부분만 업데이트
  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
    // // 👇 자동으로 json 반환, express보다 깔끔한 것을 볼 수 있다
    // return {
    //   updatedMovie: movieId,
    //   ...updateData,
    // };
  }
}
