import 'reflect-metadata';
import { Rune } from '../../lib/server';
import { AppModule } from './app.module';
function bootstrap() {
  const app = Rune.Application.create(AppModule);
}

bootstrap();
