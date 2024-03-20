import NullishError from '@/errors/NullishError';

export const nonNullish = <T>(value: T | null | undefined): T => {
  if (value === undefined || value === null) {
    throw new NullishError();
  }
  return value;
};
