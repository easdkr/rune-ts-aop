import { RuneClient } from '../../lib/client';
import { AppPage, MenuPage } from '../page';

@RuneClient.Navigator({
  pages: [AppPage, MenuPage],
})
export class AppNavigator {}
