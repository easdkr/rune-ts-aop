import { rootContainer } from 'lib/core/container';
import { Injectable } from 'lib/core/injectable.decorator';
import { ModuleResolver } from 'lib/core/module-resolver';
import { instantiateModule, Module } from 'lib/core/module.decorator';
import 'reflect-metadata';

@Injectable()
class Logger {
  log(message: string) {
    console.log('[info]', message);
  }
}

@Injectable()
class Database {
  constructor(private logger: Logger) {}

  connect() {
    this.logger.log('Connected to database');
  }
}

@Injectable()
class Service {
  constructor(private database: Database) {}

  run() {
    this.database.connect();
  }
}

@Module({
  providers: [Logger, Database, Service],
})
class Test {}

function bootstrap() {
  const moduleResolver = new ModuleResolver();
  moduleResolver.instantiate(Test);
  const service = rootContainer.resolve(Service);
  service.run();
}

bootstrap();
