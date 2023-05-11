import { type } from 'os';
import { Movie } from 'src/movies/movies.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
//        👆 @Unique(['username', 'id']) 이렇게 하면 두 개가 슈퍼키? 느낌으로 묶이는듯, username이 중복 허용됨
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  //      movie에서 user를 접근 할 때 위치 명시 👇      👇 true = user 정보를 가져올 때 movie정보도 같이 가져옴
  @OneToMany((type) => Movie, (movie) => movie.user, { eager: true })
  movies: Movie[];
}
