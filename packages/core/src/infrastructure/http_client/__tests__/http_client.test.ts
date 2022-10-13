import createHttpClient, { HttpClient, DEFAULT_TIMEOUT_MS } from '../http_client';

describe('createHttpClient', () => {
  describe('when called', () => {
    const subject = createHttpClient();
    it('creates the http client', () => {
      expect(subject).toBeInstanceOf(HttpClient);
    });
    it('sets the default timeout', () => {
      expect(subject.instance.defaults.timeout).toEqual(DEFAULT_TIMEOUT_MS);
    });
  });
});
