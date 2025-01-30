import { app, RuneServer } from '@rune-ts/server';
import { ModuleResolver } from './module-resolver';

export class RuneApplication {
  #moduleResolver = new ModuleResolver();
  #app: RuneServer;

  constructor(module: any) {
    this.#app = app();
    this.#moduleResolver.instantiate(module);
    this.#app.use(this.#moduleResolver.router);
  }

  public static create(module: any) {
    return new RuneApplication(module).app;
  }

  public get app() {
    return this.#app;
  }
}
