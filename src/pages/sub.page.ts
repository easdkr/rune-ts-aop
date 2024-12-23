import { PageRoute } from '@lib/client';
import { html, Html, Page } from 'rune-ts';

@PageRoute('/sub/test')
export class SubPage extends Page<{}> {
  protected template(data: {}): Html {
    return html`<div><p>Sub Page 인데용?</p></div>`;
  }
}
