export const makePath = (base: string, ...rest: string[]): string =>
  [base, ...rest].join("/");
