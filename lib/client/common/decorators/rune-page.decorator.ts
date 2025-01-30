import { Enable, Page } from 'rune-ts';
import { ClassConstructor } from '../../../server/types';
import { PAGE_METADATA } from '../../constants';

export function RunePage(key?: string) {
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
