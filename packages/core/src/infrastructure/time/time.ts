import { DateTime } from 'luxon';

const now = () => {
  // Returns YYYY-MM-DDTHH:MM:SS.SSSZ
  return DateTime.utc().toISO();
};

const getDateTimeFromISOString = (dateTime: string) => {
  // Returns MM/DD/YYYY, HH:MM:SS PM
  return convertISOStringToDateTime(dateTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
};

const getDateFromISOString = (dateTime: string) => {
  // Returns MM/DD/YYYY
  return convertISOStringToDateTime(dateTime).toLocaleString(DateTime.DATE_SHORT);
};

const getTimeFromISOString = (dateTime: string) => {
  // Returns HH:MM:SS PM
  return convertISOStringToDateTime(dateTime).toLocaleString(DateTime.TIME_WITH_SECONDS);
};

const convertISOStringToDateTime = (dateTime: string) => {
  return DateTime.fromISO(dateTime);
};

export default now;
export { getDateTimeFromISOString, getDateFromISOString, getTimeFromISOString };
