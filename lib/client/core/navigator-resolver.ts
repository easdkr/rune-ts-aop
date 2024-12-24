import { forEach, pipe } from '@fxts/core';
import { PAGE_METADATA } from '@lib/client';
import { RunePageContainer } from '@lib/client/core/page-container';
import { hydrate } from '@rune-ts/server';

export class NavigatorResolver {
  constructor(private readonly container: RunePageContainer) {}

  resolve(navigator: any) {
    pipe(
      (Reflect.getMetadata('pages', navigator) || []) as any[],
      forEach((page) => this.container.set(Reflect.getMetadata(PAGE_METADATA, page), page)),
    );
    return hydrate(this.container.resolveAll() as Record<string, any>);
  }
}
