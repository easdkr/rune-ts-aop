import { RequestMethod } from '@lib/common';

export interface IRequest {
  path: string;
  method: RequestMethod;
  methodName: string | symbol;
}
