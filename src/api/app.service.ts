import { Injectable } from '@lib/common';

@Injectable()
export class AppService {
  constructor() {
    console.log('AppService created');
  }

  public getHello(): string {
    return 'Hello World!';
  }
}
