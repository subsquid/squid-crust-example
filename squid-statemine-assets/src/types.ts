export type EntityConstructor<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
};

export type WhereCondition = {
  string: string;
};
