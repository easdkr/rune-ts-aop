import { AppResponseView } from '@/page';
import { AppController } from '@/server/app.controller';
import { AppRepository } from '@/server/app.repository';
import { AppService } from '@/server/app.service';
import { Rune } from '@lib/server';

@Rune.Module({
  providers: [AppService, AppRepository],
  controllers: [AppController],
  views: [AppResponseView],
})
export class AppModule {}
