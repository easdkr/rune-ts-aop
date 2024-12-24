import { AppPage, SubPage } from '@/client/pages';
import { RuneClient } from '@lib/client';

@RuneClient.Navigator({
  pages: [AppPage, SubPage],
})
export class AppNavigator {}
