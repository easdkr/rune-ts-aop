import { AppPage } from '@/page/app.page';
import { SubPage } from '@/page/sub.page';
import { RuneClient } from '@lib/client';

@RuneClient.Navigator({
  pages: [AppPage, SubPage],
})
export class AppNavigator {}
