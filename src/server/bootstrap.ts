import 'reflect-metadata';
import { Rune } from '@lib/server';
import { AppModule } from '@/server/app.module';

function bootstrap() {
  const app = Rune.Application.create(AppModule);
}

bootstrap();
