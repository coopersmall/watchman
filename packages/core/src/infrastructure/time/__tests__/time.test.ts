import now, { getDateFromISOString, getDateTimeFromISOString, getTimeFromISOString } from '../time';

const isoString = '2022-10-21T12:00:00';

describe('now', () => {
  const newDateTimeAsISOString = now();
  const expectedDateTimeFormat = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

  it('matches expected format', () => {
    expect(newDateTimeAsISOString).toMatch(expectedDateTimeFormat);
  });
});

describe('getDateFromISOString', () => {
  const dateFromISOString = getDateFromISOString(isoString);
  const expectedDateTime = '10/21/2022';

  itReturnsExpectedFormat(dateFromISOString, expectedDateTime);
});

describe('getDateTimeFromISOString', () => {
  const dateTimeFromISOString = getDateTimeFromISOString(isoString);
  const expectedDateTime = '10/21/2022, 12:00:00 PM';
  itReturnsExpectedFormat(dateTimeFromISOString, expectedDateTime);
});

describe('getTimeFromISOString', () => {
  const timeFromISOString = getTimeFromISOString(isoString);
  const expectedDateTime = '12:00:00 PM';

  itReturnsExpectedFormat(timeFromISOString, expectedDateTime);
});

function itReturnsExpectedFormat(returnedDateTime: string, expectedDateTime: string) {
  it('returns the expected date time format', () => {
    expect(returnedDateTime).toEqual(expectedDateTime);
  });
}
