import { flatMap, forEach, map, peek, pipe, toArray } from '@fxts/core';
import { rootContainer } from './container';
import { ClassConstructor } from '@lib/types';
import {
  CONTROLLER_METADATA,
  CONTROLLERS_METADATA,
  PARAMTYPES_METADATA,
  PROVIDERS_METADATA,
  REQUEST_METHOD_TOKEN,
} from '@lib/constants';
import { Router } from 'express';
import { IRequest } from '@lib/common';

export class ModuleResolver {
  #router = Router();

  public instantiate(module: ClassConstructor<any>) {
    this.#instantiateProviders(module);
    this.#instantiateControllers(module);
  }

  public get router() {
    return this.#router;
  }

  #instantiateProviders(module: ClassConstructor<any>) {
    const providers = Reflect.getMetadata(PROVIDERS_METADATA, module);
    if (!providers) return;

    providers.forEach((provider: any) => rootContainer.register(provider, this.#resolveInstance(provider)));
  }

  #instantiateControllers(module: ClassConstructor<any>) {
    const controllers = Reflect.getMetadata(CONTROLLERS_METADATA, module);
    if (!controllers) return;

    pipe(
      (Reflect.getMetadata(CONTROLLERS_METADATA, module) || []) as any[],
      peek((controller) => {
        rootContainer.register(controller, this.#resolveInstance(controller));
      }),
      flatMap((controller) => {
        const router = Reflect.getMetadata(REQUEST_METHOD_TOKEN, controller) as IRequest[];
        return router.map((req) => ({
          ...req,
          controller: rootContainer.resolve(controller),
        }));
      }),
      forEach(({ method, path, methodName, controller }) => {
        const _path = Reflect.getMetadata(CONTROLLER_METADATA, controller);
        this.#router[method](path, controller[methodName].bind(controller));
      }),
    );
  }

  #resolveInstance(Target: any) {
    const dependenciesInstances = pipe(
      (Reflect.getMetadata(PARAMTYPES_METADATA, Target) || []) as any[],
      map((dependency) => {
        const instance = rootContainer.resolve(dependency);
        console.log('instance', instance);
        if (!instance) this.#resolveInstance(dependency);
        return instance;
      }),
    );

    return new Target(...dependenciesInstances);
  }
}
