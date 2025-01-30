import { Enable } from 'rune-ts';
import style from './app.page.module.scss';
import { RuneClient } from '../../lib/client';

export class AppEnable extends Enable {
  @RuneClient.On('click', `.${style.action}`)
  handleClick() {
    alert('Rune is working!');
  }
}
