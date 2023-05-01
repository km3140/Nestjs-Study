import { Repository, DataSource } from 'typeorm';
import { Movie } from './movies.entity';
import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';

// @EntityRepository
@Injectable()
export class MoviesRepository extends Repository<Movie> {
  constructor(private dataSource: DataSource) {
    // 👇👆 @EntityRepository deprecated 해결법 ㅠ
    super(Movie, dataSource.createEntityManager());
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.create(createMovieDto);
    await this.save(movie);
    return movie;
  }
}
