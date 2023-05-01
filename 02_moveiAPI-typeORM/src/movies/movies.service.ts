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
