import { Injectable, Module } from '@lib/common';
import { ModuleResolver } from '@lib/core/module-resolver';
import { rootContainer } from '@lib/core/container';

describe(ModuleResolver.name, () => {
  describe('instantiate', () => {
    it('provider 들이 재귀적으로 인스턴스화 (의존성 하나씩)', () => {
      // given
      @Injectable()
      class FirstService {}

      @Injectable()
      class SecondService {
        constructor(public firstService: FirstService) {}
      }

      @Injectable()
      class ThirdService {
        constructor(public secondService: SecondService) {}
      }

      @Module({
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

      @Module({
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
  });
});
