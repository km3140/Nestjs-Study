// entity = schema?
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MovieGenres } from './movies-genres.enum';

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
}
