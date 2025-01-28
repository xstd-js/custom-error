import { CustomError, type CustomErrorOptions } from '../custom-error.js';

export interface WebSocketErrorOptions extends CustomErrorOptions {
  readonly code?: number;
  readonly reason?: string;
  readonly wasClean?: boolean;
}

export class WebSocketError extends CustomError<'WebSocketError'> {
  static fromCloseEvent(
    event: CloseEvent,
    options?: Omit<WebSocketErrorOptions, 'code' | 'reason' | 'wasClean'>,
  ): WebSocketError {
    return new WebSocketError({
      message: `WebSocket closed with code ${event.code} and reason: ${event.reason}`,
      ...options,
      code: event.code,
      reason: event.reason,
      wasClean: event.wasClean,
    });
  }

  readonly code: number | undefined;
  readonly reason: string | undefined;
  readonly wasClean: boolean | undefined;

  constructor({ code, reason, wasClean, ...options }: WebSocketErrorOptions = {}) {
    super('WebSocketError', options);
    this.code = code;
    this.reason = reason;
    this.wasClean = wasClean;
  }
}
