export const useGetWeek = (date) => {
  const startOfWeek = date.clone().startOf("week");
  const endOfWeek = date.clone().endOf("week");

  const dates = [];

  while (startOfWeek.isSameOrBefore(endOfWeek)) {
    dates.push(startOfWeek.clone());
    startOfWeek.add(1, "days");
  }

  return { dates };
};
