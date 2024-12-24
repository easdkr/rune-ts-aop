import { RequestMethod } from '@lib/server/common';

export interface IRequest {
  path: string;
  method: RequestMethod;
  methodName: string | symbol;
}
