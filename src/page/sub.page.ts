import { RuneClient } from '@lib/client';
import { html, Html, Page } from 'rune-ts';

interface SubPageProps {
  id: number;
  name: string;
}

@RuneClient.Page()
export class SubPage extends Page<SubPageProps> {
  protected template(): Html {
    return html`<div>
      <p>id : ${this.data.id}</p>
      <p>name : ${this.data.name}</p>
    </div>`;
  }
}
