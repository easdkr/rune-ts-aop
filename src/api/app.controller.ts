import { AppService } from '@/api/app.service';
import { AppPage } from '@/pages';
import { Controller, Get } from '@lib/common';
import { MetaView } from '@rune-ts/server';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(_: any, res: any): void {
    const message = this.appService.getHello();
    const page = new MetaView(new AppPage({ message }), {});
    res.send(page.toHtml());
  }
}
