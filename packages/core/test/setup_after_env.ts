import nock from 'nock';

beforeEach(() => {
  nock.cleanAll();
});

beforeAll(() => {
  nock.disableNetConnect();
  nock.enableNetConnect('127.0.0.1');

  if (!nock.isActive()) {
    nock.activate();
  }
});

afterAll(() => {
  nock.restore();
  nock.enableNetConnect();
  nock.cleanAll();
});
