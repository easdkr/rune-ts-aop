import { Rune } from '..';
import { Injectable, Controller, Get } from '../common';
import { rootContainer } from './container';
import { ModuleResolver } from './module-resolver';

describe(ModuleResolver.name, () => {
  afterEach(() => {
    rootContainer.reset();
  });

  describe('instantiate', () => {
    it('provider 들이 재귀적으로 인스턴스화 (의존성 하나씩)', () => {
      // given
      @Injectable()
      class FirstService {
        public test() {
          return '[FirstService] test';
        }
      }

      @Injectable()
      class SecondService {
        constructor(public firstService: FirstService) {}

        public test() {
          console.log(this.firstService.test());
          return '[SecondService] test';
        }
      }

      @Injectable()
      class ThirdService {
        constructor(public secondService: SecondService) {}

        public test() {
          console.log(this.secondService.test());
          return '[ThirdService] test';
        }
      }

      @Rune.Module({
        providers: [FirstService, SecondService, ThirdService],
      })
      class TestModule {}

      const moduleResolver = new ModuleResolver();

      // when
      moduleResolver.instantiate(TestModule);

      // then
      expect(rootContainer.resolve(FirstService)).toBeInstanceOf(FirstService);
      expect(rootContainer.resolve(SecondService)).toBeInstanceOf(SecondService);
      expect(rootContainer.resolve(ThirdService)).toBeInstanceOf(ThirdService);
      expect(rootContainer.resolve(FirstService)!.test()).toBe('[FirstService] test');
      expect(rootContainer.resolve(SecondService)!.test()).toBe('[SecondService] test');
      expect(rootContainer.resolve(ThirdService)!.test()).toBe('[ThirdService] test');
    });

    it('provider 의 다중 의존성이 재귀적으로 인스턴스화', () => {
      // given
      @Injectable()
      class FirstService {}

      @Injectable()
      class SecondService {
        constructor(public firstService: FirstService) {}
      }

      @Injectable()
      class ThirdService {
        constructor(
          public firstService: FirstService,
          public secondService: SecondService,
        ) {}
      }

      @Rune.Module({
        providers: [FirstService, SecondService, ThirdService],
      })
      class TestModule {}

      const moduleResolver = new ModuleResolver();

      // when
      moduleResolver.instantiate(TestModule);

      // then
      expect(rootContainer.resolve(FirstService)).toBeInstanceOf(FirstService);
      expect(rootContainer.resolve(SecondService)).toBeInstanceOf(SecondService);
      expect(rootContainer.resolve(ThirdService)).toBeInstanceOf(ThirdService);
    });

    it('controller 인스턴스화', () => {
      // given
      @Injectable()
      class FixtureService {
        public test() {
          return '[FixtureService] test';
        }
      }

      @Controller()
      class FixtureController {
        constructor(public firstService: FixtureService) {}

        @Get('fixture')
        public test() {
          return this.firstService.test();
        }
      }

      @Rune.Module({
        providers: [FixtureService],
        controllers: [FixtureController],
      })
      class FixtureModule {}

      const moduleResolver = new ModuleResolver();

      // when
      moduleResolver.instantiate(FixtureModule);

      // then
      expect(rootContainer.resolve(FixtureController)).toBeInstanceOf(FixtureController);
      expect(rootContainer.resolve(FixtureService)).toBeInstanceOf(FixtureService);
      expect(rootContainer.resolve(FixtureController)!.test()).toBe('[FixtureService] test');
    });
  });
});
