import { Html, html, Page } from 'rune-ts';
import style from './app.page.module.scss';

export interface PageProps {
  message: string;
}

export class AppPage extends Page<PageProps> {
  template(): Html {
    return html` <div class="${style.container}">
      <span class="${style.title}">${this.data.message}</span>
    </div>`;
  }
}
