// entity = schema?
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MovieGenres } from './movies-genres.enum';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number; //           👆 AUTO_INCREMENT

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
