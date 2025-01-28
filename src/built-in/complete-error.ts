import { CustomError, type CustomErrorOptions } from '../custom-error.js';

export interface CompleteErrorOptions extends CustomErrorOptions {
  readonly reason?: unknown;
}

/**
 * @experimental
 */
export class CompleteError extends CustomError<'CompleteError'> {
  readonly reason: unknown;

  constructor({ reason, ...options }: CompleteErrorOptions = {}) {
    super('CompleteError', options);

    this.reason = reason;
  }
}
