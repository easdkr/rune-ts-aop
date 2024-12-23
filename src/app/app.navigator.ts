import { AppPage, SubPage } from '@/pages';
import { Navigator } from '@lib/client';

@Navigator({
  pages: [AppPage, SubPage],
})
export class AppNavigator {}
