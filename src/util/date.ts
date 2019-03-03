export const parseExifDate = (exifDate: string) => {
  const [date, time] = exifDate.split(' ');

  const [year, month, day] = date.split(':');
  const [hour, min, sec] = time.split(':');

  //const monthIndex = parseInt(month, 10) - 1;

  const dateStrings = [year, month, day, hour, min, sec];

  const [yearArg, monthArg, dayArg, hourArg, minArg, secArg] = dateStrings.map(
    (arg: string) => parseInt(arg, 10)
  );

  const monthIndexArg = monthArg - 1;

  return new Date(
    yearArg,
    monthIndexArg,
    dayArg,
    hourArg,
    minArg,
    secArg
  ).toISOString();
};
