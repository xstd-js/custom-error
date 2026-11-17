import { beforeAll, describe, expect, test } from 'vitest';
import { CustomError } from './custom-error.js';

describe('CustomError', (): void => {
  describe('new(..)', (): void => {
    test('is constructible', (): void => {
      expect(new CustomError('TestError')).toBeDefined();
    });

    test('instanceof', (): void => {
      const error = new CustomError('TestError');

      expect(error).toBeInstanceOf(CustomError);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('properties', (): void => {
    let error!: CustomError;

    beforeAll((): void => {
      error = new CustomError('TestError', {
        message: 'test',
        cause: 'cause',
      });
    });

    test('name', (): void => {
      expect(error.name).toBe('TestError');
    });

    test('message', (): void => {
      expect(error.message).toBe('test');
    });

    test('cause', (): void => {
      expect(error.cause).toBe('cause');
    });

    test('stack', (): void => {
      expect(error.stack).toBeDefined();
    });
  });
});
