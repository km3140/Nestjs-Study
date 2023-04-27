import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  // 👆 라우터와 비슷
  providers: [AppService],
})
export class AppModule {}
