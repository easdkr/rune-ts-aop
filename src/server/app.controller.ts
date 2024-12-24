import { AppPage } from '@/client/pages';
import { AppService } from '@/server/app.service';
import { Rune } from '@lib/server';
import { MetaView } from '@rune-ts/server';
import { Response, Request } from 'express';

@Rune.Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Rune.Route.Get('/')
  getHello(_: Request, res: Response): void {
    const message = this.appService.getHello();
    res.send(new MetaView(new AppPage({ message }), {}).toHtml());
  }
}
