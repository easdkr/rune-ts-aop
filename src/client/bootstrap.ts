import 'reflect-metadata';
import { RuneClient } from '../../lib/client';
import { AppNavigator } from './app.navigator';

function bootstrap() {
  RuneClient.Factory.create(AppNavigator);
}

bootstrap();
