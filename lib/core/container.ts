import { ClassConstructor } from 'lib/types';
import { Container as TypeDiContainer } from 'typedi';

export class Container {
  resolve<T = any>(target: ClassConstructor<T>): T {
    return TypeDiContainer.get(target as any);
  }

  register(target: any, instance: any): void {
    TypeDiContainer.set(target, instance);
  }
}

export const rootContainer = new Container();
