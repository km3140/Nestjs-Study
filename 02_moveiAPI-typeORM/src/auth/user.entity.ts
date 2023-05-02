import {
  BaseEntity,
  Column,
  Entity,
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
}
