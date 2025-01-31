import { Html, html, Page } from 'rune-ts';
import style from './app.page.module.scss';
import { UseInitializer } from '../../lib/shared/decorators/use-initializer.decorator';
import { ResponseView } from '../../lib/server/common';
import { AppPageInitializer } from './app.initializer';
import { SecondInitializer } from './second.initializer';

export interface PageProps {
  message: string;
}

@UseInitializer(AppPageInitializer, SecondInitializer)
@ResponseView({ path: '/' })
export class AppPage extends Page<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  template(): Html {
    return html` <div class="${style.container}">
      <span class="${style.title}">${this.data.message}</span>
      <button class="${style.action}">Click</button>
    </div>`;
  }
}
