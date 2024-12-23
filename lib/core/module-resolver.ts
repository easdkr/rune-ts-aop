import { map, pipe, toArray } from '@fxts/core';
import { rootContainer } from './container';
import { ClassConstructor } from '@lib/types';
import { PARAMTYPES_METADATA, PROVIDERS_METADATA } from '@lib/constants';

export class ModuleResolver {
  public instantiate(module: ClassConstructor<any>) {
    this.#instantiateProviders(module);
  }

  #instantiateProviders(module: ClassConstructor<any>) {
    const providers = Reflect.getMetadata(PROVIDERS_METADATA, module);
    if (!providers) return;

    providers.forEach((provider: any) => {
      rootContainer.register(provider, this.#resolveInstance(provider));
    });
  }

  #resolveInstance(Target: any) {
    const dependenciesInstances = pipe(
      (Reflect.getMetadata(PARAMTYPES_METADATA, Target) || []) as any[],
      map((dependency) => {
        const instance = rootContainer.resolve(dependency);
        if (!instance) this.#resolveInstance(dependency);
        return rootContainer.resolve(dependency);
      }),
      toArray,
    );

    return new Target(dependenciesInstances);
  }
}
