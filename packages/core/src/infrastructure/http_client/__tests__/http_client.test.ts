import createHttpClient, { HttpClient } from '../http_client';
import { DEFAULT_TIMEOUT_MS } from '../constants';

describe('HttpClient', () => {
  const itCreatesHttpClient = (subject: HttpClient, timeout: number) => {
    it('creates a new http client', () => {
      expect(subject).toBeInstanceOf(HttpClient);
    });

    it('sets timeout', () => {
      expect(subject.instance.defaults.timeout).toEqual(timeout);
    });
  };

  describe('with new HttpClient', () => {
    const whenInvoked = (timeout?: number) => {
      if (timeout) return new HttpClient(timeout);
      return new HttpClient();
    };

    describe('without timeout', () => {
      const subject = whenInvoked();

      itCreatesHttpClient(subject, DEFAULT_TIMEOUT_MS);
    });

    describe('with timeout', () => {
      const timeout = 10000;
      const subject = whenInvoked(timeout);

      itCreatesHttpClient(subject, timeout);
    });
  });

  describe('createHttpClient', () => {
    const whenInvoked = (timeout?: number) => {
      if (timeout) return createHttpClient(timeout);
      return createHttpClient();
    };

    describe('without timeout', () => {
      const subject = whenInvoked();

      itCreatesHttpClient(subject, DEFAULT_TIMEOUT_MS);
    });

    describe('with timeout', () => {
      const timeout = 10000;
      const subject = whenInvoked(timeout);

      itCreatesHttpClient(subject, timeout);
    });
  });
});
