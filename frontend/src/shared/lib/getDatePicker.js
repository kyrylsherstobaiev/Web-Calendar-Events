export const getDatePicker = (
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  day = new Date().getDate(),
) => {
  return new Date(year, month, day);
};
