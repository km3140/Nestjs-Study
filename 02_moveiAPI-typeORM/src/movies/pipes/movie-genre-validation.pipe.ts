// 안 쓰는 파일.
// 커스텀파이프, parameter유효성 검증에 쓰이는 거였음, dto의 genre에 쓰려했는데
// genres에 @IsIn(values: any[], {each: true}) 를 쓰면 될 듯
import { PipeTransform, BadRequestException } from '@nestjs/common';

export class MoiveGenreValidationPipe implements PipeTransform {
  readonly GenreOptions = ['ACTION', 'DRAMA', 'COMEDY', 'ROMANCE', 'THRILLER'];

  transform(value: any) {
    const genres = value.genres;
    if (!this.isGenreValid(genres)) {
      throw new BadRequestException(`${genres} is not avaliable`);
    }
  }

  private isGenreValid(genres: string[]) {
    genres.forEach((genre) => {
      const upperGenre = genre.toUpperCase();
      if (!this.GenreOptions.includes(upperGenre)) {
        return false;
      }
    });
    return true;
  }
}
