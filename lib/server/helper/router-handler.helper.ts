import { resolveMethodParameters } from '@lib/server/helper/resolve-method-parameters.helper';
import { AnonymousFunction, ClassConstructor } from '@lib/server/types';
import { MetaView } from '@rune-ts/server';
import { NextFunction, Request, Response } from 'express';

export function handleRouter(handler: AnonymousFunction, target: ClassConstructor<any>, methodName: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const args = resolveMethodParameters(req, target.prototype, methodName);
      const result: any = await handler.apply(target, args);
      if (!res.headersSent) {
        // TODO layout data 처리에 대한 미들웨어 추가
        res.status(200).send(new MetaView(result, {}).toHtml());
      }
    } catch (error) {
      next(error);
    }
  };
}
