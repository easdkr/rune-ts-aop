import Container from 'typedi';
import { PARAMTYPES_METADATA, PROVIDERS_METADATA } from './constants';

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
  const providers = Reflect.getMetadata(PROVIDERS_METADATA, module);
  if (providers) {
    providers.forEach((provider: any) => {
      // provider의 생성자 매개변수 (의존성) 가져오기
      const dependencies = Reflect.getMetadata(PARAMTYPES_METADATA, provider) || [];
      // 의존성 인스턴스 가져오기
      const instances = dependencies.map((dependency: any) => Container.get(dependency));
      // 의존성을 주입하여 provider 인스턴스 생성
      Container.set(provider, new provider(...instances));
    });
  }
}

export function instantiateModule(module: any) {
  instantiateProviders(module);
}
