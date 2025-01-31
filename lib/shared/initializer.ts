import { Context } from './context';

export type { Request } from 'express';

export interface Initializer<T, D = any> {
  initialize(context: Context<D>): T | Promise<T>;
}
