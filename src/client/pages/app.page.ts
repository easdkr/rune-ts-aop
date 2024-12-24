import { Html, html, Page } from 'rune-ts';
import style from './app.page.module.scss';
import { RuneClient } from '@lib/client';

export interface PageProps {
  message: string;
}

@RuneClient.Page()
export class AppPage extends Page<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  template(): Html {
    return html` <div class="${style.container}">
      <span class="${style.title}">${this.data.message}</span>
      <button id="rune-action">Click me</button>
    </div>`;
  }

  @RuneClient.On('click', '#rune-action')
  handleClick() {
    alert('Hello from Rune!');
  }
}
