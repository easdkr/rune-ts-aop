import { PAGE_METADATA } from '@lib/client';
import { ClassConstructor } from '@lib/server/types';
import { Page } from 'rune-ts';

export function RunePage(key = '') {
  return (target: ClassConstructor<Page<any>>) => {
    const runeKey = key || target.name;

    const newConstructor = function (...args: any[]) {
      const instance = new target(...args);
      instance.key = runeKey;
      return instance;
    };

    newConstructor.prototype = target.prototype;

    Reflect.defineMetadata(PAGE_METADATA, runeKey, newConstructor);
    return newConstructor as any;
  };
}
