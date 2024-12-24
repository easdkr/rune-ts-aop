import { RuneClient } from '@lib/client';
import { Enable } from 'rune-ts';

export class AppEnable extends Enable {
  @RuneClient.On('click', '#rune-action')
  handleClick() {
    alert('Hello from Rune!');
  }
}
