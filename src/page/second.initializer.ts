import { Injectable } from '../../lib/server/common';
import { Context, Initializer } from '../../lib/shared';
import { PageProps } from './app.page';

interface Props {
  message: string;
}

@Injectable()
export class SecondInitializer implements Initializer<Props> {
  initialize(ctx: Context<PageProps>): Props {
    const { message } = ctx.data!;

    return { message: `Second: ${message}` };
  }
}
