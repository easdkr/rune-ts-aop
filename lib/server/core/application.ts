import { ModuleResolver } from '@lib/server/core';
import { app, RuneServer } from '@rune-ts/server';

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
