import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'movie-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // 👆 엔티티를 이용해서 데이터베이스 테이블을 생성, 엔티티 파일 경로 설정.
  synchronize: true,
  // 👆 true를 주면 애플리케이션을 다시 실행할 때 엔티티 안에서 수정된 컬럼의 길이 타입 변경값 등을 해당 테이블을 drop한 후 다시 생성함
};
