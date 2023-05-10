import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  // 미들웨어 종류 : Pipes, Filter, Guards, Interceptors
  @UseGuards(AuthGuard())
  // 👆 받은 토큰이 유효하다면 payload에 있는 정보를
  //          👇 여기에 넣어줌
  test(@Req() req) {
    console.log(req);
  }
}
