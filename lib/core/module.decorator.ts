import Container from 'typedi';

export interface ModuleOptions {
  providers?: any[];
}

export function Module(options: ModuleOptions): ClassDecorator {
  return (target: Function) => {
    for (const property in options) {
      if (options.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, (options as any)[property], target);
      }
    }
  };
}

export function instantiateProviders(module: any) {
  const providers = Reflect.getMetadata('providers', module);
  if (providers) {
    providers.forEach((provider: any) => {
      Container.set(provider, new provider());
    });
  }
}

export function instantiateModule(module: any) {
  instantiateProviders(module);
}
