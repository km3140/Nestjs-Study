import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';
import { MoviesRepository } from './movies.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movies.entity';

// 👇 dependency injection
@Injectable()
export class MoviesService {
  constructor(
    // @InjectRepository(MoviesRepository) 👈 typeORM 3.x.x 업데이트로 오류남
    private moviesRepository: MoviesRepository,
  ) {}

  async getAllMovies(): Promise<Movie[]> {
    return this.moviesRepository.find();
    //                            👆 인자로 객체 안에 옵션 넣어서 특정한 데이터를 찾아줄 수 있는데 안 넣으면 다 가져옴
  }

  async getMovieById(id: number): Promise<Movie> {
    const found = await this.moviesRepository.findOneBy({ id });
    //                                        👆 findOne(id)에서 변경
    if (!found) {
      throw new NotFoundException(`Can't find Movie with id ${id}`);
    }

    return found;
  }

  createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesRepository.createMovie(createMovieDto);
  }

  //                                     👇 리턴값 없을때
  async deleteMovie(id: number): Promise<void> {
    const result = await this.moviesRepository.delete(id);
    //                                   👆 지웠으면 result.affected === 1, 해당 아이디에 맞는 영화가 없으면 0, remove()는 못찾으면 에러 리턴
    if (result.affected === 0) {
      throw new NotFoundException(`Cant find Movie with id ${id}`);
    }
  }

  async updateMovie(id: number, updateData: UpdateMovieDto): Promise<Movie> {
    const movie = await this.getMovieById(id);
    if (updateData.title) movie.title = updateData.title;
    if (updateData.year) movie.year = updateData.year;
    if (updateData.genres) movie.genres = updateData.genres;
    await this.moviesRepository.save(movie);
    return movie;
  }

  // 👇👇👇👇👇로컬 스토리지 사용👇👇👇👇👇

  // // fake database
  // private movies: Movie[] = [];
  // getAll(): Movie[] {
  //   return this.movies;
  // }
  // getOne(id: number): Movie {
  //   const movie = this.movies.find((movie) => movie.id === id);
  //   //                                              👆 === parseInt(id), number로 형변환
  //   if (!movie) {
  //     throw new NotFoundException(`Movie with ID ${id} not found.`);
  //     //        👆 nestjs에서 제공하는 예외처리
  //   }
  //   return movie;
  // }
  // deleteOne(id: number): Movie {
  //   const movie = this.getOne(id);
  //   this.movies = this.movies.filter((movie) => movie.id !== id);
  //   return movie;
  // }
  // create(movieData: CreateMovieDto) {
  //   this.movies.push({
  //     id: this.movies.length + 1, // 👈 @PrimaryGeneratedColumn('increment') 할거임
  //     ...movieData,
  //   });
  // }
  // update(id: number, updateData: UpdateMovieDto) {
  //   const movie = this.getOne(id);
  //   this.deleteOne(id);
  //   this.movies.push({
  //     ...movie,
  //     ...updateData,
  //   });
  // }
}
