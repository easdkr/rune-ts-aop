import {
  Controller as RuneController,
  Module as RuneModule,
  Injectable as RuneInjectable,
  Get as _Get,
  Post as _Post,
  Put as _Put,
  Patch as _Patch,
  Delete as _Delete,
  Options as _Options,
} from '@lib/server/common';
import { RuneApplication } from '@lib/server/core';

export namespace Rune {
  export const Controller = RuneController;
  export const Module = RuneModule;
  export const Injectable = RuneInjectable;

  export namespace Route {
    export const Get = _Get;
    export const Post = _Post;
    export const Put = _Put;
    export const Patch = _Patch;
    export const Delete = _Delete;
    export const Options = _Options;
  }

  export class Application extends RuneApplication {}
}
