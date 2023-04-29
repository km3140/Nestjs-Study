import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entites/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';

// 👇 dependency injection
@Injectable()
export class MoviesService {
  // fake database
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    //                                              👆 === parseInt(id), number로 형변환
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
      //        👆 nestjs에서 제공하는 예외처리
    }
    return movie;
  }

  deleteOne(id: number): Movie {
    const movie = this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return movie;
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({
      ...movie,
      ...updateData,
    });
  }
}
