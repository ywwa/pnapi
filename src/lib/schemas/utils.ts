export const formatDate = (date: Date): string => {
  const pad = (num: number) => String(num).padStart(2, "0");

  const makeDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    return `${year}-${month}-${day}`;
  };

  const makeTime = (date: Date): string => {
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
  };

  return `${makeDate(date)} ${makeTime(date)}`;
};
