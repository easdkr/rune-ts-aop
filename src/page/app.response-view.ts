import { html, Html, on, Page } from 'rune-ts';
import style from './app.response-view.module.scss';
import { ResponseView } from '@lib/server/common';
import { delay } from '@fxts/core';

@ResponseView({ path: '/app' })
export class AppResponseView extends Page<{}> {
  protected template(): Html {
    return html`
      <div class="${style.container}">
        <span>Rendering...</span>
        <button>Click</button>
      </div>
    `;
  }

  protected async onRender(): Promise<void> {
    await delay(1500);
    this.element().querySelector('span')!.textContent = 'Response View Rendered';
    this.delegate('click', 'button', () => {
      alert('App Response View!');
    });
  }
}
