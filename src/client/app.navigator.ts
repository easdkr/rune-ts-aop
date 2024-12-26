import { AppResponseView, MenuPage } from '@/page';
import { AppPage } from '@/page/app.page';
import { RuneClient } from '@lib/client';

@RuneClient.Navigator({
  pages: [AppPage, MenuPage, AppResponseView],
})
export class AppNavigator {}
