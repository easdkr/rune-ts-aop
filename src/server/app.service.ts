import { Rune } from '@lib/server';

@Rune.Injectable()
export class AppService {
  constructor() {}

  public getHello(): string {
    return 'Hello Rune!';
  }
}
