import { Injectable } from '@lib/common';

@Injectable()
export class AppService {
  constructor() {}

  public getHello(): string {
    return 'Hello World!';
  }
}
