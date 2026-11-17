import { CustomError, type CustomErrorOptions } from '../../custom-error.js';

export type AggregatedErrorEntry = readonly [key: string | number, error: unknown];

export interface AggregatedErrorOptions extends CustomErrorOptions {
  readonly errors?: Iterable<AggregatedErrorEntry | unknown> | Record<string, unknown> | undefined;
}

/**
 * An error that aggregates multiple errors.
 *
 * @example
 *
 * ```ts
 * const error = new AggregatedError({
 *   errors: [
 *     ['foo', new Error('foo')],
 *     ['bar', new Error('bar')],
 *   ],
 * });
 * ```
 */
export class AggregatedError extends CustomError<'AggregatedError'> {
  readonly #errors: ReadonlyMap<string | number, unknown>;

  constructor({ errors, ...options }: AggregatedErrorOptions = {}) {
    super('AggregatedError', options);

    const map = new Map<string | number, unknown>();

    if (errors !== undefined) {
      const addEntry = ([key, error]: AggregatedErrorEntry): void => {
        if (map.has(key)) {
          throw new Error(`Duplicate key: ${key}`);
        }
        map.set(key, error);
      };

      if (!(Symbol.iterator in errors)) {
        errors = Object.entries(errors);
      }

      let index: number = 0;
      for (const error of errors) {
        if (Array.isArray(error)) {
          addEntry(error as unknown as AggregatedErrorEntry);
        } else {
          addEntry([index, error]);
        }
        index++;
      }
    }
    this.#errors = map;
  }

  /**
   * The list of errors.
   */
  get errors(): ReadonlyMap<string | number, unknown> {
    return this.#errors;
  }

  /**
   * Attempts to reduce the number of errors to a single one:
   *
   * - throw if there is no error to shorten
   * - return the first error if there is only one error
   * - return `this` if there are multiple errors
   */
  shorten(): AggregatedError | unknown {
    if (this.#errors.size === 0) {
      throw new Error('No errors to shorten.');
    } else if (this.#errors.size === 1) {
      return this.#errors.values().next().value;
    } else {
      return this;
    }
  }
}
