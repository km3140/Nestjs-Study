import { IsString, IsNumber, IsOptional } from 'class-validator';

// DTO : Data Transfer Object : 데이터 전송을 위한 모델
export class CreateMovieDto {
  // 👇 class-validator의 decorator, 아래 프로퍼티가 string인지 검사, 아닐 시 에러코드 리턴
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;

  //    IsOptional() : 해당 필드의 값을 체크하여 null이나 undefined의 경우, 해당 필드의 다른 데코레이터들을 무시한다.
  //    create.movie.dto에서 PartialType으로 optional프로퍼티로 만들었지만
  // 👇 IsString의 each옵션 때문에 오류가 나는듯
  //          👇 모든 요소에 IsString
  @IsString({ each: true })
  readonly genres: string[];
}
