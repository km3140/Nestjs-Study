import { IsString, IsNumber, IsNotEmpty, IsIn } from 'class-validator';
import { MovieGenres } from '../movies-genres.enum';

// DTO : Data Transfer Object : 데이터 전송을 위한 모델
export class CreateMovieDto {
  // 👇 class-validator의 decorator, 아래 프로퍼티가 string인지 검사, 아닐 시 에러코드 리턴
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  // 👇 'i'sNotEmpty() 조심
  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  //    IsOptional() : 해당 필드의 값을 체크하여 null이나 undefined의 경우, 해당 필드의 다른 데코레이터들을 무시한다.
  //    create.movie.dto에서 PartialType으로 optional프로퍼티로 만들었지만
  // 👇 강의에선 IsString의 each옵션 때문에 오류가 난 것 같음(patch할때), 근데 없어도 되는데?, 변경사항이 생긴듯?
  // @IsOptional()
  //          👇 모든 요소에 IsString
  @IsString({ each: true })
  @IsIn(['action', 'drama', 'comedy', 'romance', 'thriller'], {
    each: true,
  })
  readonly genres: MovieGenres[];
}
