import { PAGE_ROUTE_METADATA } from '@lib/constants';

export function PageRoute(path = ''): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(PAGE_ROUTE_METADATA, path, target);
  };
}
