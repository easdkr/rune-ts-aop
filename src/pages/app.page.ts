import { Html, html, Page } from 'rune-ts';
import style from './app.page.module.scss';
import { PageRoute } from '@lib/client';

export interface PageProps {
  message: string;
}

@PageRoute('/')
export class AppPage extends Page<PageProps> {
  template(): Html {
    return html` <div class="${style.container}">
      <span class="${style.title}">${this.data.message}</span>
    </div>`;
  }
}
