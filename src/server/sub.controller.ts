import { SubPage } from '@/page';
import { Rune } from '@lib/server';

@Rune.Controller('sub')
export class SubController {
  @Rune.Get('')
  public render(@Rune.Query('name') name: string, @Rune.Query('id') id: number): SubPage {
    return new SubPage({ name, id });
  }
}
