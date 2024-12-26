import { AppPage, MenuPage } from '@/page';
import { AppService } from '@/server/app.service';
import { Rune } from '@lib/server';

@Rune.Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Rune.Get()
  async hello(): Promise<AppPage> {
    const message = await this.appService.hello();

    return new AppPage({ message });
  }

  @Rune.Get('@api')
  async api(): Promise<{ message: string }> {
    return { message: 'api' };
  }

  @Rune.Get('menu/:id')
  async id(@Rune.Param('id') id: number) {
    const [menuId, name] = await this.appService.findOne(+id);

    return new MenuPage({
      id: menuId,
      name,
    });
  }
}
