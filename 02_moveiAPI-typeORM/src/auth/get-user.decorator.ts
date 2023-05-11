import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

// 커스텀 데코레이터 만들기
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    //                      👆 파라미터 데코레이터 만들기
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
