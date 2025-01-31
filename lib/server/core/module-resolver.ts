import { flatMap, forEach, map, peek, pipe, reduce, reduceLazy, toArray, toAsync } from '@fxts/core';
import { rootContainer } from './container';
import { MetaView } from '@rune-ts/server';
import { Router } from 'express';
import { ResponseViewOptions, IRequest } from '../common';
import {
  RESPONSE_VIEW_TOKEN,
  PROVIDERS_METADATA,
  CONTROLLERS_METADATA,
  REQUEST_METHOD_TOKEN,
  CONTROLLER_METADATA,
  PARAMTYPES_METADATA,
} from '../constants';
import { ResponseStrategySelector, JsonResponseStrategy, RuneResponseStrategy, handleRouter } from '../helper';
import { ClassConstructor } from '../types';
import { USE_INITIALIZER_TOKEN } from '../../shared/decorators/use-initializer.decorator';
import { Initializer } from '../../shared/initializer';
import { Context } from '../../shared';

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
    pipe(
      (Reflect.getMetadata('views', module) || []) as any[],
      map((view) => {
        const viewOptions = Reflect.getMetadata(RESPONSE_VIEW_TOKEN, view) as ResponseViewOptions;
        const initializers = Reflect.getMetadata(USE_INITIALIZER_TOKEN, view) || [];
        return {
          path: viewOptions.path,
          initializers,
          view,
        };
      }),
      forEach(({ path, view, initializers }) => {
        const initializerInstances = pipe(
          initializers,
          map((initializers) => this.#resolveInstance(initializers)),
          toArray,
        ) as Initializer<any>[];

        this.#router.get(path, async (req, res) => {
          const context = await pipe(
            initializerInstances,
            toAsync,
            reduceLazy(
              async (context, curr) => {
                const data = await curr.initialize(context);
                context.data = data;
                return context;
              },
              new Context(req, res),
            ),
          );

          res.send(new MetaView(new view(context.data), {}).toHtml());
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
