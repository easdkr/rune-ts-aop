import { AppController } from '@/api/app.controller';
import { AppService } from '@/api/app.service';
import { SubController } from '@/api/sub.controller';
import { Module } from '@lib/common';

@Module({
  providers: [AppService],
  controllers: [AppController, SubController],
})
export class AppModule {}
