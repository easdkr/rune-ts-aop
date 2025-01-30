import { forEach, pipe } from '@fxts/core';
import { hydrate } from '@rune-ts/server';
import { RunePageContainer } from './page-container';

export class NavigatorResolver {
  constructor(private readonly container: RunePageContainer) {}

  resolve(navigator: any) {
    // pipe(
    //   (Reflect.getMetadata('pages', navigator) || []) as any[],
    //   forEach((page) => this.container.set(Reflect.getMetadata(PAGE_METADATA, page), page)),
    // );
    const scriptTag = document.querySelector('script.__RUNE_DATA__');
    const data = JSON.parse(scriptTag?.innerHTML || '{}');
    console.log(data);

    return hydrate(this.container.resolveAll() as Record<string, any>);
  }
}
