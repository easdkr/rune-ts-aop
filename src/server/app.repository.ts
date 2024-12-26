import { Injectable } from '@lib/server/common';

@Injectable()
export class AppRepository {
  constructor() {}

  #dummyMenu = [
    [1, 'americano'],
    [2, 'latte'],
    [3, 'mocha'],
  ] as [number, string][];

  #emptyMenu: [number, string] = [-1, 'unknown'];

  public findOne(id: number) {
    return this.#dummyMenu.find((data) => data[0] === id) ?? this.#emptyMenu;
  }
}
