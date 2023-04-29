import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

//                                               👇 basetype
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
//                                  👆 basetype의 프로퍼티를 모두 선택적 프로퍼티로 변환
