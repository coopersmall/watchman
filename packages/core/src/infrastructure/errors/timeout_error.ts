import { ErrorMeta } from './error_meta';

export default class TimeoutError extends Error {
  readonly meta: ErrorMeta;

  constructor(message: string, meta?: ErrorMeta) {
    super(message);
    this.meta = meta ? meta : {};
  }
}
