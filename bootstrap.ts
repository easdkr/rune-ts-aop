import { Injectable } from 'lib/core/injectable.decorator';
import { instantiateModule, Module } from 'lib/core/module.decorator';
import 'reflect-metadata';
import Container from 'typedi';

@Injectable()
class Logger {
  log(message: string) {
    console.log(message);
  }
}

@Module({
  providers: [Logger],
})
class Test {}

function bootstrap() {
  instantiateModule(Test);

  const logger = Container.get(Logger);
  logger.log('Hello, World!!!!');
}

bootstrap();
