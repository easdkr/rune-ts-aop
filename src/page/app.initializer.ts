import { Injectable } from '../../lib/server/common';
import { Initializer } from '../../lib/shared/initializer';
import { PageProps } from '.';

@Injectable()
export class AppPageInitializer implements Initializer<PageProps> {
  initialize(): PageProps | Promise<PageProps> {
    return { message: 'Hello, Rune!' };
  }
}
