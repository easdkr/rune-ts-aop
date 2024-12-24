import { delay } from '@fxts/core';
import { Rune } from '@lib/server';

@Rune.Injectable()
export class AppService {
  constructor() {}

  public getHello() {
    return delay(500, 'Hello from Rune!');
  }
}
