import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // 👆 sesstion또는 jwt같은 인증을 편리하게 도와주는 라이브러리
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      //        👆 jwt 검증 비밀번호
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
        // 👆 토큰 유효기간 : 60분
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JWtStrategy],
  exports: [JWtStrategy, PassportModule],
  //        👆           👆 다른 모듈에서도 사용할 수 있도록?
})
export class AuthModule {}
