import { RuneClient } from '@lib/client';
import { html, Html, Page } from 'rune-ts';

@RuneClient.Page()
export class SubPage extends Page<{}> {
  protected template(data: {}): Html {
    return html`<div><p>Sub Page 인데용?</p></div>`;
  }
}
