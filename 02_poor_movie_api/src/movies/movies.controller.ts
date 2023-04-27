import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

//            👇 해당 컨트롤러의 엔트리 포인트
@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  // 👇 search가 Get(':id') 보다 아래에 있다면 search가 파라미터로 인식됨, express와 마찬가지
  @Get('search')
  search(@Query('year') searchingYear: string) {
    //   👆 url의 쿼리를 가져옴 (?year=2000)
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    //   👆 파라미터 요청 후 사용해야한다
    //      id파라미터를 movieId 이름으로 사용
    return `This will return one movie with the id: ${movieId}`;
  }

  // ex) Body : {"name":"Tenet", "director":"Nolan"}
  @Post()
  create(@Body() movieData) {
    //    👆 Body 가져오기
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  // @Patch()
  // put은 모든 리소스를 업데이트, patch는 리소스의 일부분만 업데이트
  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    // 👇 자동으로 json 반환, express보다 깔끔한 것을 볼 수 있다
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
