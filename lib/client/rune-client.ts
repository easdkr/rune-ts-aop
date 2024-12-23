import { NavigatorResolver } from '@lib/client/navigator-resolver';
import { hydrate } from '@rune-ts/server';

export class RuneClient {
  #navigatorResolver: NavigatorResolver;

  constructor(navigator: any) {
    this.#navigatorResolver = new NavigatorResolver();
    hydrate(this.#navigatorResolver.resolve(navigator));
  }

  public static create(navigator: any) {
    return new RuneClient(navigator);
  }
}
