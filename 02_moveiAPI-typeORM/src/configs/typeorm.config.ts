import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host, // 👈 배포환경의 환경변수가 없으면 dbConfig.host
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // 👆 엔티티를 이용해서 데이터베이스 테이블을 생성, 엔티티 파일 경로 설정.
  synchronize: dbConfig.synchronize,
  // 👆 true를 주면 애플리케이션을 다시 실행할 때 엔티티 안에서 수정된 컬럼의 길이 타입 변경값 등을 해당 테이블을 drop한 후 다시 생성함
};
