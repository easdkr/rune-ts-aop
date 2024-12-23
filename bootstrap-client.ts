import 'reflect-metadata';
import { RuneClient } from '@lib/client';
import { AppNavigator } from '@/app';

function bootstrap() {
  RuneClient.create(AppNavigator);
}
bootstrap();
