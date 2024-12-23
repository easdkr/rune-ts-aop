import { AppController } from '@/api/app.controller';
import { AppService } from '@/api/app.service';
import { Module } from '@lib/common';

@Module({
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
