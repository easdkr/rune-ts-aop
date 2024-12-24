import { NavigatorResolver, RunePageContainer } from '@lib/client';
import { hydrate } from '@rune-ts/server';

export class RuneClientFactory {
  #navigatorResolver: NavigatorResolver;

  constructor(navigator: any) {
    this.#navigatorResolver = new NavigatorResolver(new RunePageContainer());
    this.#navigatorResolver.resolve(navigator);
  }

  public static create(navigator: any) {
    return new RuneClientFactory(navigator);
  }
}
