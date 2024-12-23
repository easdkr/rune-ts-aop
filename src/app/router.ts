import { AppPage } from '@/pages';
import { createRouter } from '@rune-ts/server';

export const ClientRouter = createRouter({
  '/': AppPage,
});
