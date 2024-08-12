export const makePath = (base: string, ...rest: string[]): string =>
  [base, ...rest].join("/");

export const dateToString = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, "0");

  function makeDate(date: Date): string {
    const Y = date.getFullYear();
    const M = pad(date.getMonth() + 1);
    const D = pad(date.getDate());

    return `${Y}-${M}-${D}`;
  }

  function makeTime(date: Date): string {
    const HH = pad(date.getHours());
    const MM = pad(date.getMinutes());
    const SS = pad(date.getSeconds());

    return `${HH}:${MM}:${SS}`;
  }

  return `${makeDate(date)} ${makeTime(date)}`;
};
