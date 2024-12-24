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
  Query as _Query,
  Body as _Body,
  Param as _Param,
  Req as _Req,
  Res as _Res,
  Headers as _Headers,
} from '@lib/server/common';
import { RuneApplication } from '@lib/server/core';

export namespace Rune {
  export const Controller = RuneController;
  export const Module = RuneModule;
  export const Injectable = RuneInjectable;

  export const Get = _Get;
  export const Post = _Post;
  export const Put = _Put;
  export const Patch = _Patch;
  export const Delete = _Delete;
  export const Options = _Options;

  export const Query = _Query;
  export const Body = _Body;
  export const Param = _Param;
  export const Req = _Req;
  export const Res = _Res;
  export const Headers = _Headers;

  export class Application extends RuneApplication {}
}
