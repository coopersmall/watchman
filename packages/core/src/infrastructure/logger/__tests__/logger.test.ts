import createLogger from '../logger';

describe('createLogger', () => {
  const service = 'test';

  it('creates logger', () => {
    const logger = createLogger(service);
    expect(logger).toBeDefined();
  });

  it('sets default meta data', () => {
    const logger = createLogger(service);
    expect(logger.getService()).toEqual(service);
  });
});
