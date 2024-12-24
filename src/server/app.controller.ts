import { AppPage } from '@/page';
import { AppService } from '@/server/app.service';
import { Rune } from '@lib/server';

@Rune.Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Rune.Get()
  async getHello() {
    const message = await this.appService.getHello();
    return new AppPage({ message });
  }
}
