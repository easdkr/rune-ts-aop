import { createRouter } from '@rune-ts/server';
import { Page } from 'rune-ts';

export class RuneClientRouter {
  #pageMap = new Map<string, typeof Page<any>>();

  set(path: string, page: typeof Page<any>) {
    this.#pageMap.set(path, page);

    return this;
  }

  build() {
    return createRouter(Object.fromEntries(this.#pageMap.entries()));
  }
}

export const rootClientRouter = new RuneClientRouter();
