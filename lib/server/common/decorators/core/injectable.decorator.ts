import { INJECTABLE_METADATA } from '@lib/server/constants';

export const Injectable = (): ClassDecorator => {
  return (target: Function) => {
    Reflect.defineMetadata(INJECTABLE_METADATA, true, target);
  };
};
