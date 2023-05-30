export const handleGetFormatTime = (time) => {
  if (!time) return;

  const date = new Date(time);

  return `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} lúc ${date.getHours()}:${date.getMinutes()}`;
};
