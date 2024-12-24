import { AppController } from '@/server/app.controller';
import { AppService } from '@/server/app.service';
import { SubController } from '@/server/sub.controller';
import { Rune } from '@lib/server';

@Rune.Module({
  providers: [AppService],
  controllers: [AppController, SubController],
})
export class AppModule {}
