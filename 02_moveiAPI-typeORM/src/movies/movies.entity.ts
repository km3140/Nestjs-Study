// entity = schema?
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieGenres } from './movies-genres.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number; //           👆 AUTO_INCREMENT, 안붙여줘도 되나?

  @Column()
  title: string;

  @Column() // 'bigint' -> string?
  year: number;

  @Column({
    type: 'enum',
    enumName: 'MoiveGenres',
    enum: MovieGenres,
    array: true,
  })
  genres: MovieGenres[];

  //      user에서 movie를 접근 할 때 위치 명시 👇      👇 false = movie 정보를 가져올 때 user 정보는 가져오지 않음
  @ManyToOne((type) => User, (user) => user.movies, { eager: false })
  user: User;
}
