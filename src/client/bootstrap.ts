import 'reflect-metadata';
import { RuneClient } from '@lib/client';
import { AppNavigator } from '@/client/app.navigator';

function bootstrap() {
  RuneClient.Factory.create(AppNavigator);
}

bootstrap();
