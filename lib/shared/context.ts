import type { Request, Response } from 'express';

export class Context<T = any> {
  constructor(
    private readonly _request: Request,
    private readonly _response: Response,
    private _data?: T,
  ) {}

  get request(): Request {
    return this._request;
  }

  get response(): Response {
    return this._response;
  }

  get data(): T | undefined {
    return this._data;
  }

  set data(data: T | undefined) {
    this._data = data;
  }
}
