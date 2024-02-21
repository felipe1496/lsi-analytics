export type IsUnknown<T> = unknown extends T
  ? T extends unknown
    ? true
    : false
  : false;
