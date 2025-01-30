import { Container as TypeDiContainer } from 'typedi';
import { ClassConstructor } from '../types';

export class Container {
  resolve<T = any>(target: ClassConstructor<T>): T | null {
    try {
      return TypeDiContainer.get(target);
    } catch {
      return null;
    }
  }

  register(target: any, instance: any): void {
    TypeDiContainer.set(target, instance);
  }

  reset(): void {
    TypeDiContainer.reset();
  }
}

export const rootContainer = new Container();
