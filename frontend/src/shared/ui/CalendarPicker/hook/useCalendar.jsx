import { useEffect, useState } from "react";
import { getDatePicker } from "../../../lib/getDatePicker.js";
import { arrayRange } from "../../../lib/arrayRange.js";
import { useDispatch, useSelector } from "react-redux";
import { setPickedDate } from "../../../../app/reducers/pickedDate.js";
import { resetToday } from "../../../../app/reducers/isToday.js";
import moment from "moment";

const FORMATTER = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const useCalendar = (startYear, endYear) => {
  const [dayDefault, setDayDefault] = useState(() =>
    FORMATTER.format(getDatePicker()),
  );

  const dispatch = useDispatch();

  const yearsArrays = arrayRange(startYear, endYear, 1);

  const [yearListShow, setYearListShow] = useState(true);
  const [chooseYear, setChooseYear] = useState(new Date().getFullYear());
  const [chooseMonth, setChooseMonth] = useState(new Date().getMonth());

  const [daysInMonthSetter, setDaysInMonthSetter] = useState(0);
  const [startWeekDay, setStartWeekDay] = useState(0);

  const [dayToday, setDayToday] = useState(0);

  const [pickDateCalendar, setPickDateCalendar] = useState({
    day: new Date().getDate(),
    month: +new Date().getMonth() + 1,
    year: +new Date().getFullYear(),
  });

  const isToday = useSelector((state) => state.isToday);

  const daysInMonth = () => new Date(chooseYear, chooseMonth + 1, 0).getDate();
  const firstDay = () => new Date(chooseYear, chooseMonth).getDay();

  const showYearList = () => {
    setYearListShow((prevState) => !prevState);
  };

  const pickYearAtList = (year) => {
    setYearListShow((prevState) => !prevState);
    setChooseYear(year);
  };

  const handleMonthLeft = () => {
    setChooseMonth((prevState) =>
      prevState < 1 ? prevState + 11 : prevState - 1,
    );
  };

  const handleMonthRight = () => {
    setChooseMonth((prevState) =>
      prevState > 10 ? prevState - 11 : prevState + 1,
    );
  };

  const handleDayPick = (dayNumber) => {
    const getDate = getDatePicker(chooseYear, chooseMonth, +dayNumber);
    setDayDefault(FORMATTER.format(getDate));
    setPickDateCalendar({
      day: +dayNumber,
      month: chooseMonth,
      year: +chooseYear,
    });
    dispatch(setPickedDate(`${moment(getDate).format("DD/MM/YYYY")}`));
    setDayToday(0);
    dispatch(resetToday());
  };

  const handleToday = () => {
    setChooseYear(new Date().getFullYear());
    setChooseMonth(new Date().getMonth());
    setDayToday(new Date().getDate());
  };

  useEffect(() => {
    if (+isToday.date > 0) handleToday();
  }, [isToday]);

  useEffect(() => {
    if (+isToday.date > 0 || dayToday > 0) handleDayPick(new Date().getDate());
  }, [dayToday]);

  useEffect(() => {
    setDaysInMonthSetter(() => daysInMonth());
    setStartWeekDay(() => (firstDay() < 1 ? 6 : firstDay() - 1));
  }, [chooseMonth, chooseYear]);

  return {
    dayDefault,
    chooseYear,
    chooseMonth,
    yearsArrays,
    yearListShow,
    daysInMonthSetter,
    startWeekDay,
    pickDateCalendar,
    handleMonthLeft,
    handleMonthRight,
    handleToday,
    showYearList,
    pickYearAtList,
    handleDayPick,
  };
};
