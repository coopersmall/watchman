import ClientError from '../client_error';
import ServerError from '../server_error';
import TimeoutError from '../timeout_error';

const message = 'bad';
const meta = {
  details: 'you messed up'
};

describe('ClientError', () => {
  describe('with error meta', () => {
    const error = new ClientError(message, 400, meta);

    itSetsMetaData(error, meta);
  });

  describe('without error meta', () => {
    const error = new ClientError(message, 400);

    itSetsMetaData(error, {});
  });
});

describe('ServerError', () => {
  describe('with error meta', () => {
    const error = new ServerError(message, 500, meta);

    itSetsMetaData(error, meta);
  });

  describe('without error meta', () => {
    const error = new ServerError(message, 500);

    itSetsMetaData(error, {});
  });
});

describe('TimeoutError', () => {
  describe('with error meta', () => {
    const error = new TimeoutError(message, meta);

    itSetsMetaData(error, meta);
  });

  describe('without error meta', () => {
    const error = new TimeoutError(message);

    itSetsMetaData(error, {});
  });
});

function itSetsMetaData(error: ClientError | ServerError | TimeoutError, expectedErrorMeta: any) {
  it('correctly sets meta data', () => {
    expect(error.meta).toEqual(expectedErrorMeta);
  });
}
