import { RuneClient } from '@lib/client';
import { Enable } from 'rune-ts';
import style from './app.page.module.scss';

export class AppEnable extends Enable {
  @RuneClient.On('click', `.${style.action}`)
  handleClick() {
    alert('Rune is working!');
  }
}
