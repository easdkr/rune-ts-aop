import { flatMap, forEach, map, peek, pipe, toArray } from '@fxts/core';
import { rootContainer } from './container';
import { ClassConstructor } from '@lib/server/types';
import {
  CONTROLLER_METADATA,
  CONTROLLERS_METADATA,
  PARAMTYPES_METADATA,
  PROVIDERS_METADATA,
  REQUEST_METHOD_TOKEN,
  RESPONSE_VIEW_TOKEN,
} from '@lib/server/constants';
import { Router } from 'express';
import { IRequest, ResponseViewOptions } from '@lib/server/common';
import { handleRouter, JsonResponseStrategy, ResponseStrategySelector, RuneResponseStrategy } from '@lib/server/helper';
import { MetaView } from '@rune-ts/server';

export class ModuleResolver {
  #router = Router();
  #responseStrategySelector = new ResponseStrategySelector();

  constructor() {
    this.#responseStrategySelector.register('json', new JsonResponseStrategy());
    this.#responseStrategySelector.register('rune', new RuneResponseStrategy());
  }

  public instantiate(module: ClassConstructor<any>) {
    this.#instantiateProviders(module);
    this.#instantiateControllers(module);
    this.#mapToResponseViewAndRouter(module);
  }

  public get router() {
    return this.#router;
  }

  #mapToResponseViewAndRouter(module: ClassConstructor<any>) {
    return pipe(
      (Reflect.getMetadata('views', module) || []) as any[],
      map((view) => {
        const viewOptions = Reflect.getMetadata(RESPONSE_VIEW_TOKEN, view) as ResponseViewOptions;
        return {
          path: viewOptions.path,
          view,
        };
      }),
      forEach(({ path, view }) => {
        this.#router.get(path, (req, res) => {
          res.status(200).send(new MetaView(new view({}), {}).toHtml());
        });
      }),
    );
  }

  #instantiateProviders(module: ClassConstructor<any>) {
    pipe(
      (Reflect.getMetadata(PROVIDERS_METADATA, module) || []) as any[],
      forEach((provider) => rootContainer.register(provider, this.#resolveInstance(provider))),
    );
  }

  #instantiateControllers(module: ClassConstructor<any>) {
    pipe(
      (Reflect.getMetadata(CONTROLLERS_METADATA, module) || []) as any[],
      peek((controller) => rootContainer.register(controller, this.#resolveInstance(controller))),
      flatMap((controller) =>
        pipe(
          (Reflect.getMetadata(REQUEST_METHOD_TOKEN, controller) || []) as IRequest[],
          map((req) => ({
            ...req,
            path: `/${Reflect.getMetadata(CONTROLLER_METADATA, controller)}/${req.path}`
              .replace(/\/+/g, '/')
              .replace(/\/$/, ''),
            controller: rootContainer.resolve(controller),
          })),
        ),
      ),
      forEach(({ method, path, methodName, controller }) =>
        this.#router[method](
          path,
          handleRouter(
            controller[methodName].bind(controller),
            controller.constructor,
            methodName,
            this.#responseStrategySelector,
          ),
        ),
      ),
    );
  }

  #resolveInstance(Target: any) {
    const alreadyRegistered = rootContainer.resolve(Target);
    if (alreadyRegistered) return alreadyRegistered;

    const dependenciesInstances: any = pipe(
      (Reflect.getMetadata(PARAMTYPES_METADATA, Target) || []) as any[],
      map((dependency) => {
        const instance = rootContainer.resolve(dependency);
        if (instance) return instance;
        return this.#resolveInstance(dependency);
      }),
    );

    const instance = new Target(...dependenciesInstances);
    rootContainer.register(Target, instance);
    return instance;
  }
}
