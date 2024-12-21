import { ClassConstructor } from '../types/class-constructor';
import { PROVIDERS_METADATA, PARAMTYPES_METADATA } from './constants';
import { rootContainer } from './container';

export class ModuleResolver {
  public instantiate(module: ClassConstructor<any>) {
    this.#instantiateProviders(module);
  }

  #instantiateProviders(module: ClassConstructor<any>) {
    const providers = Reflect.getMetadata(PROVIDERS_METADATA, module);
    if (!providers) return;

    providers.forEach((provider: any) => {
      // provider의 생성자 매개변수 (의존성) 가져오기
      const dependencies: any[] = Reflect.getMetadata(PARAMTYPES_METADATA, provider) || [];
      const dependenciesInstances = dependencies.map((dependency) => {
        const instance = rootContainer.resolve(dependency);
        // 의존성에 대한 인스턴스가 없다면 재귀적으로 인스턴스 생성
        if (!instance) this.#instantiateProviders(dependency);
        return rootContainer.resolve(dependency);
      });
      // 의존성을 주입하여 provider 인스턴스 생성
      rootContainer.register(provider, new provider(...dependenciesInstances));
    });
  }
}
