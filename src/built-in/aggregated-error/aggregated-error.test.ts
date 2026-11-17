import { beforeAll, describe, expect, it, test } from 'vitest';
import { CustomError } from '../../custom-error.js';
import { AggregatedError } from './aggregated-error.js';

describe('AggregatedError', (): void => {
  describe('new(..)', (): void => {
    test('is constructible', (): void => {
      expect(new AggregatedError()).toBeDefined();
    });

    test('instanceof', (): void => {
      const error = new AggregatedError();

      expect(error).toBeInstanceOf(AggregatedError);
      expect(error).toBeInstanceOf(CustomError);
      expect(error).toBeInstanceOf(Error);
    });

    it('prevents duplicate keys', (): void => {
      expect(
        () =>
          new AggregatedError({
            errors: [
              ['a', 0],
              ['a', 1],
            ],
          }),
      ).toThrow();
    });

    it('supports array', (): void => {
      expect(
        new AggregatedError({
          errors: ['a', 'b'],
        }).errors.get(0),
      ).toBe('a');
    });

    it('supports record', (): void => {
      expect(
        new AggregatedError({
          errors: {
            a: 0,
            b: 1,
          },
        }).errors.get('a'),
      ).toBe(0);
    });
  });

  describe('properties', (): void => {
    let error!: AggregatedError;

    beforeAll((): void => {
      error = new AggregatedError({
        errors: [
          ['foo', new Error('foo')],
          ['bar', new Error('bar')],
        ],
      });
    });

    test('errors', (): void => {
      expect(error.errors.size).toBe(2);
      expect((error.errors.get('foo') as Error).message).toBe('foo');
      expect((error.errors.get('bar') as Error).message).toBe('bar');
    });
  });

  describe('methods', (): void => {
    describe('shorten', (): void => {
      test('no error', (): void => {
        expect(() =>
          new AggregatedError({
            errors: [],
          }).shorten(),
        ).toThrow();
      });

      test('one error', (): void => {
        const shortened: unknown = new AggregatedError({
          errors: [['foo', new Error('foo')]],
        }).shorten();

        expect(shortened).toBeInstanceOf(Error);
        expect((shortened as Error).message).toBe('foo');
      });

      test('multiple errors', (): void => {
        const shortened: unknown = new AggregatedError({
          errors: [
            ['foo', new Error('foo')],
            ['bar', new Error('bar')],
          ],
        }).shorten();

        expect(shortened).toBeInstanceOf(AggregatedError);
        expect((shortened as AggregatedError).errors.size).toBe(2);
      });
    });
  });
});
