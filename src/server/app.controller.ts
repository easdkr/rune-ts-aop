import { Rune } from '../../lib/server';
import { AppPage, MenuPage } from '../page';
import { AppService } from './app.service';

@Rune.Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Rune.Get()
  // async hello(): Promise<AppPage> {
  //   const message = await this.appService.hello();

  //   return new AppPage({ message });
  // }

  @Rune.Get('@api')
  async api(): Promise<{ message: string }> {
    return Promise.resolve({ message: 'api' });
  }

  @Rune.Get('menu/:id')
  async id(@Rune.Param('id') id: number): Promise<MenuPage> {
    const [menuId, name] = await this.appService.findOne(+id);

    return new MenuPage({
      id: menuId,
      name,
    });
  }
}
