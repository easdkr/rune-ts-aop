import { CONTROLLER_METADATA } from '@lib/server/constants';

export function Controller(path = ''): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(CONTROLLER_METADATA, path, target);
  };
}
