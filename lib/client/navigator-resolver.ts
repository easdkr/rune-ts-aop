import { forEach, pipe } from '@fxts/core';
import { PAGE_ROUTE_METADATA } from '@lib/constants';
import { rootClientRouter } from '@lib/client/client-router';

export class NavigatorResolver {
  resolve(navigator: any) {
    console.log(Reflect.getMetadata('pages', navigator.constructor) || []);
    pipe(
      (Reflect.getMetadata('pages', navigator.constructor) || []) as any[],
      forEach((page) => {
        const path = Reflect.getMetadata(PAGE_ROUTE_METADATA, page);
        rootClientRouter.set(path, page);
      }),
    );
    return rootClientRouter.build();
  }
}
