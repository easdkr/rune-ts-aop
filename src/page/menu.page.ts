import { RuneClient } from '@lib/client';
import { html, Html, Page } from 'rune-ts';

export interface MenuPageProps {
  id: number;
  name: string;
}

@RuneClient.Page()
export class MenuPage extends Page<MenuPageProps> {
  public template(data: MenuPageProps): Html {
    return html`
      <div>
        <p>Menu ID: ${data.id}</p>
        <p>Menu Name: ${data.name}</h1>
      </div>
    `;
  }
}
