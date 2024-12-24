export * from './constants';
export * from './core';
import { RuneNavigator, RunePage, RuneUseEnables } from '@lib/client/common/decorators';
import { RuneClientFactory } from '@lib/client/core';
import { on } from 'rune-ts';

export namespace RuneClient {
  export const Page = RunePage;
  export const UseEnables = RuneUseEnables;
  export const Navigator = RuneNavigator;
  export class Factory extends RuneClientFactory {}
  export const On = on;
}
