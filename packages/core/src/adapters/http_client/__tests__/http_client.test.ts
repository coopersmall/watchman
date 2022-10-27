import nock from 'nock';
import createHttpClient, { IHttpClient } from '../http_client';
import { DEFAULT_TIMEOUT_MS } from '../constants';
import ClientError from '../../../infrastructure/errors/client_error';
import ServerError from '../../../infrastructure/errors/server_error';
import TimeoutError from '../../../infrastructure/errors/timeout_error';

const baseUrl = 'https://www.test.com';
const uri = '/get-token';
const headers = {
  'Content-Type': 'application/json'
};

describe('HttpClient', () => {
  const httpClient = createHttpClient();

  describe('request', () => {
    const url = `${baseUrl}${uri}?id=btc`;
    const method = 'GET';
    const query = {
      id: 'btc'
    };
    const requestConfig = {
      url,
      method,
      headers
    };

    describe('with 2xx status code', () => {
      const status = 200;
      const responseBody = {
        success: 'yay'
      };

      withRequest(status, responseBody);

      itSucceeds(whenInvoked);
      itReturnsAResponse(whenInvoked, responseBody);
    });

    describe('with 4xx status code', () => {
      const status = 400;
      const responseBody = {
        error: 'bad'
      };

      withRequest(status, responseBody);

      it('returns a client error', async () => {
        const response = await whenInvoked();
        expect(response).toBeInstanceOf(ClientError);
      });
    });

    describe('with 5xx status code', () => {
      const status = 500;
      const responseBody = {
        error: 'bad'
      };

      withRequest(status, responseBody);

      it('returns a server error', async () => {
        const response = await whenInvoked();
        expect(response).toBeInstanceOf(ServerError);
      });
    });

    describe('with timout', () => {
      beforeEach(() => {
        nock(baseUrl).get(uri).query(query).replyWithError({ code: 'ECONNABORTED' });
      });

      it('returns a timeout error', async () => {
        const response = await whenInvoked();
        expect(response).toBeInstanceOf(TimeoutError);
      });
    });

    describe('with unknown error', () => {
      beforeEach(() => {
        nock(baseUrl).get(uri).query(query).replyWithError({ code: 'whoops' });
      });

      it('does not return a client error, server error, or timeout error', async () => {
        const response = await whenInvoked();
        expect(response).not.toBeInstanceOf(ClientError);
        expect(response).not.toBeInstanceOf(ServerError);
        expect(response).not.toBeInstanceOf(TimeoutError);
        expect(response).toBeInstanceOf(Error);
      });
    });

    async function whenInvoked() {
      try {
        return await httpClient.request(requestConfig);
      } catch (e) {
        return e;
      }
    }

    function withRequest(status: number, responseBody: any) {
      beforeEach(() => {
        nock(baseUrl).get(uri).query(query).reply(status, responseBody);
      });
    }
  });

  describe('get', () => {
    const url = `${baseUrl}${uri}?id=test`;
    const status = 200;
    const query = {
      id: 'test'
    };
    const requestConfig = {
      headers
    };
    const responseBody = {
      success: 'yay'
    };

    beforeEach(() => {
      nock(baseUrl).get(uri).query(query).reply(status, responseBody);
    });

    itSucceeds(whenInvoked);
    itReturnsAResponse(whenInvoked, responseBody);

    async function whenInvoked() {
      try {
        return await httpClient.get(url, requestConfig);
      } catch (e) {
        return e;
      }
    }
  });

  describe('post', () => {
    const url = `${baseUrl}${uri}`;
    const status = 201;
    const body = {
      message: 'hello'
    };
    const responseBody = {
      success: 'yay'
    };
    const requestConfig = {
      headers
    };

    beforeEach(() => {
      nock(baseUrl).post(uri, body).reply(status, responseBody);
    });

    itSucceeds(whenInvoked);
    itReturnsAResponse(whenInvoked, responseBody);

    async function whenInvoked() {
      try {
        return await httpClient.post(url, body, requestConfig);
      } catch (e) {
        return e;
      }
    }
  });

  describe('patch', () => {
    const url = `${baseUrl}${uri}`;
    const status = 201;
    const body = {
      message: 'hello'
    };
    const responseBody = {
      success: 'yay'
    };
    const requestConfig = {
      headers
    };

    beforeEach(() => {
      nock(baseUrl).patch(uri, body).reply(status, responseBody);
    });

    itSucceeds(whenInvoked);
    itReturnsAResponse(whenInvoked, responseBody);

    async function whenInvoked() {
      try {
        return await httpClient.patch(url, body, requestConfig);
      } catch (e) {
        return e;
      }
    }
  });

  describe('put', () => {
    const url = `${baseUrl}${uri}`;
    const status = 201;
    const body = {
      message: 'hello'
    };
    const responseBody = {
      success: 'yay'
    };
    const requestConfig = {
      headers
    };

    beforeEach(() => {
      nock(baseUrl).put(uri, body).reply(status, responseBody);
    });

    itSucceeds(whenInvoked);
    itReturnsAResponse(whenInvoked, responseBody);

    async function whenInvoked() {
      try {
        return await httpClient.put(url, body, requestConfig);
      } catch (e) {
        return e;
      }
    }
  });

  describe('delete', () => {
    const url = `${baseUrl}${uri}?id=test`;
    const status = 204;
    const query = {
      id: 'test'
    };
    const requestConfig = {
      headers
    };
    const responseBody = {
      success: 'yay'
    };

    beforeEach(() => {
      nock(baseUrl).delete(uri).query(query).reply(status, responseBody);
    });

    itSucceeds(whenInvoked);
    itReturnsAResponse(whenInvoked, responseBody);

    async function whenInvoked() {
      try {
        return await httpClient.delete(url, requestConfig);
      } catch (e) {
        return e;
      }
    }
  });

  function itReturnsAResponse(whenInvoked: Function, expectedResponse: any) {
    it('returns a response', async () => {
      const response = await whenInvoked();
      expect(response).toEqual(expectedResponse);
    });
  }

  function itSucceeds(whenInvoked: Function) {
    it('does not return an error', async () => {
      const response = await whenInvoked();
      expect(response).not.toBeInstanceOf(Error);
    });
  }
});

describe('createHttpClient', () => {
  const httpClient = createHttpClient();

  itSetsTimeout(httpClient, DEFAULT_TIMEOUT_MS);

  describe('with custom timeout', () => {
    const timeout = 10000;
    const httpClientWithCustomTimeout = createHttpClient(timeout);

    itSetsTimeout(httpClientWithCustomTimeout, timeout);
  });

  function itSetsTimeout(httpClient: IHttpClient, expectedTimeout: number) {
    it('sets timeout', () => {
      const timeout = httpClient.getTimeout();
      expect(timeout).toEqual(expectedTimeout);
    });
  }
});
