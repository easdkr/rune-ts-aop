import { SubPage } from '@/pages';
import { Controller, Get } from '@lib/common';
import { MetaView } from '@rune-ts/server';

@Controller('/sub')
export class SubController {
  @Get('/test')
  subPage(_: any, res: any): void {
    res.send(new MetaView(new SubPage({}), {}).toHtml());
  }
}
