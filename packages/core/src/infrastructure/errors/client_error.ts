import { ErrorMeta } from './error_meta';

export default class ClientError extends Error {
  readonly status: number;
  readonly meta: ErrorMeta;

  constructor(message: string, status: number, meta?: ErrorMeta) {
    super(message);
    this.status = status;
    this.meta = meta ? meta : {};
  }
}
