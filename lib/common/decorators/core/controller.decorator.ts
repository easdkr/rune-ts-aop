import { CONTROLLER_METADATA } from '@lib/core';

export function Controller(path = ''): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(CONTROLLER_METADATA, path, target);
  };
}
