import { RuneClient } from '../../lib/client';
import { AppPage, MenuPage, AppResponseView } from '../page';

@RuneClient.Navigator({
  pages: [AppPage, MenuPage, AppResponseView],
})
export class AppNavigator {}
