import { delay } from '@fxts/core';
import { Rune } from '../../lib/server';
import { AppRepository } from './app.repository';

@Rune.Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  public hello() {
    return delay(500, 'Hello from Rune!');
  }

  public findOne(id: number): [number, string] {
    return this.appRepository.findOne(id);
  }
}
