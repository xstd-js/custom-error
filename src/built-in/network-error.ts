import { CustomError, type CustomErrorOptions } from '../custom-error.js';

export interface NetworkErrorOptions extends CustomErrorOptions {
  readonly status?: number | undefined;
}

export class NetworkError extends CustomError<'NetworkError'> {
  static fromRequest(request: Request): NetworkError {
    return new NetworkError({ message: `${request.method} '${request.url}'` });
  }

  static fromResponse(response: Response): NetworkError {
    return new NetworkError({
      message: `${response.status} '${response.url}'`,
      status: response.status,
    });
  }

  readonly status: number | undefined;

  constructor({ status, ...options }: NetworkErrorOptions = {}) {
    super('NetworkError', options);
    this.status = status;
  }
}
