import { ClassConstructor } from '@lib/server/types';
import { Container as TypeDiContainer } from 'typedi';

export class Container {
  resolve<T = any>(target: ClassConstructor<T>): T {
    return TypeDiContainer.get(target as any);
  }

  register(target: any, instance: any): void {
    TypeDiContainer.set(target, instance);
  }

  reset(): void {
    TypeDiContainer.reset();
  }
}

export const rootContainer = new Container();