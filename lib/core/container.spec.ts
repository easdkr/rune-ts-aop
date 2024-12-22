import { Container } from '@lib/core';

describe(Container.name, () => {
  it('it should defined', () => {
    const container = new Container();

    expect(container).toBeDefined();
  });
});
