import { SubPage } from '@/client/pages';
import { Rune } from '@lib/server';
import { MetaView } from '@rune-ts/server';

@Rune.Controller('/sub')
export class SubController {
  @Rune.Route.Get('')
  render(_: any, res: any): void {
    res.send(new MetaView(new SubPage({}), {}).toHtml());
  }
}
