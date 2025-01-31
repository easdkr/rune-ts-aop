import { Initializer } from '../initializer';

export const USE_INITIALIZER_TOKEN = Symbol('__rune:use_initializer__');

export function UseInitializer<T>(...initializer: Array<Initializer<T> | Function>) {
  return (target: any) => {
    Reflect.defineMetadata(USE_INITIALIZER_TOKEN, initializer, target);
  };
}
