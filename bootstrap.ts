import 'reflect-metadata';

import { RuneApplication } from '@lib/core';
import { AppModule } from '@/api/app.module';

function bootstrap() {
  const app = RuneApplication.create(AppModule);
}

bootstrap();
