import { Rune } from '../../lib/server';
import { AppPage } from '../page';
import { AppController } from './app.controller';
import { AppRepository } from './app.repository';
import { AppService } from './app.service';

@Rune.Module({
  providers: [AppService, AppRepository],
  controllers: [AppController],
  views: [AppPage],
})
export class AppModule {}
