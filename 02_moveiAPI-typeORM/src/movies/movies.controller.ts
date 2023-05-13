import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
//       👆 타입만 import
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';
import { Movie } from './movies.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

//            👇 해당 컨트롤러의 엔트리 포인트
@Controller('movies')
@UseGuards(AuthGuard())
export class MoviesController {
  private logger = new Logger('MoviesController');
  //                 로그를 내보내고 있는 곳👆
  //                                              👇 type만 import했음, service는 안함
  constructor(private readonly moviesService: MoviesService) {}
  //                           👆 service는 import 하지 않았는데 service를 사용할 수 있는 이유 => dependency injection
  //                              내부적으로 콘트롤러와 서비스는 모듈파일 안에 같이 존재한다

  @Get()
  getAllMovies(@GetUser() user: User): Promise<Movie[]> {
    this.logger.verbose(`User ${user.username} trying to get all movies`);
    return this.moviesService.getAllMovies();
  }

  @Get('/owns')
  getMyMovies(@GetUser() user: User): Promise<Movie[]> {
    return this.moviesService.getMyMovies(user);
  }

  @Get('/:id')
  getMovieById(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @GetUser() user: User,
  ): Promise<Movie> {
    this.logger.verbose(
      //                                                            👇 해주지 않으면 "[object]" 이런식으로 나옴
      `User ${user.username} creating a new movie. Payload: ${JSON.stringify(
        createMovieDto,
      )}`,
    );
    return this.moviesService.createMovie(createMovieDto, user);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.moviesService.deleteMovie(id, user);
  }

  @Patch('/:id')
  updateMovie(
    @Param('id') id: number,
    @Body() updateData: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.updateMovie(id, updateData);
  }

  // @Get()
  // getAll(): Movie[] {
  //   return this.moviesService.getAll();
  // }

  // // // 👇 search가 Get(':id') 보다 아래에 있다면 search가 파라미터로 인식됨, express와 마찬가지
  // // @Get('search')
  // // search(@Query('year') searchingYear: string) {
  // //   //   👆 url의 쿼리를 가져옴 (?year=2000)
  // //   return `We are searching for a movie made after: ${searchingYear}`;
  // // }

  // @Get(':id')
  // getOne(@Param('id') movieId: number): Movie {
  //   //   👆 파라미터 요청 후 사용해야한다
  //   //      id파라미터를 movieId 이름으로 사용
  //   return this.moviesService.getOne(movieId);
  // }

  // // ex) Body = {"title":"Tenet", "year":2020, "genres": ["action", "mind blown"]}
  // @Post()
  // create(@Body() movieData: CreateMovieDto) {
  //   //    👆 Body 가져오기
  //   return this.moviesService.create(movieData);
  // }

  // @Delete(':id')
  // remove(@Param('id') movieId: number) {
  //   return this.moviesService.deleteOne(movieId);
  // }

  // // @Patch()
  // // put은 모든 리소스를 업데이트, patch는 리소스의 일부분만 업데이트
  // @Patch(':id')
  // patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
  //   return this.moviesService.update(movieId, updateData);
  //   // // 👇 자동으로 json 반환, express보다 깔끔한 것을 볼 수 있다
  //   // return {
  //   //   updatedMovie: movieId,
  //   //   ...updateData,
  //   // };
  // }
}
