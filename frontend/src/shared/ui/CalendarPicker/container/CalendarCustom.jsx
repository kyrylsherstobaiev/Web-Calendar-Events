import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { arrayRange } from "../../../lib/arrayRange.js";
import classNames from "classnames";
import { useCalendar } from "../hook/useCalendar.jsx";
import PropTypes from "prop-types";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YearList = ({ years, yearListShow, onYearPick }) => (
  <div className={classNames("list-years", { "show-year-list": yearListShow })}>
    {years.map((year, i) => (
      <div
        data-testid="item-year"
        key={i + "c"}
        className="year-item"
        onClick={(e) => {
          e.stopPropagation();
          onYearPick(year);
        }}
      >
        {year}
      </div>
    ))}
  </div>
);

const DaysOfWeek = () => (
  <div className="days-of-week">
    {DAYS_OF_WEEK.map((day, i) => (
      <div key={i + "a"}>{day.slice(0, 3)}</div>
    ))}
  </div>
);

const CalendarCustom = ({ startYear = 2000, endYear = 2040 }) => {
  const {
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
  } = useCalendar(startYear, endYear);

  const todayDateCheck = (day) =>
    +chooseYear === new Date().getFullYear() &&
    +chooseMonth === new Date().getMonth() &&
    new Date().getDate() === day - startWeekDay;

  const pickedDateCheck = (day) =>
    +chooseYear === pickDateCalendar.year &&
    +chooseMonth === pickDateCalendar.month &&
    pickDateCalendar.day === day - startWeekDay;

  return (
    <div className={"container-calendar"}>
      <div className="header">
        <div
          className="year"
          onClick={showYearList}
          role="listitem"
          data-testid="year"
        >
          {chooseYear}
          <YearList
            years={yearsArrays}
            yearListShow={yearListShow}
            onYearPick={pickYearAtList}
          />
        </div>
        <div className="todayBtn" onClick={handleToday}>
          Today
        </div>

        <div className="month">
          <div
            className="left"
            onClick={handleMonthLeft}
            data-testid="month-down"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="month-show" data-testid="month">
            {MONTHS[chooseMonth].slice(0, 3)}
          </div>
          <div
            className="right"
            onClick={handleMonthRight}
            data-testid="month-up"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
      <DaysOfWeek />
      <div className="days-number">
        {arrayRange(1, daysInMonthSetter + startWeekDay, 1).map((day, i) => {
          const isToday = todayDateCheck(day);
          const isPicked = pickedDateCheck(day);

          if (i < startWeekDay) {
            return <div key={i + "b"} className="pointer"></div>;
          }
          return (
            <div
              role="button"
              onClick={() => handleDayPick(day - startWeekDay)}
              key={i + "b"}
              className={classNames("pick-day", {
                today: isToday,
                "picked-day-calendar": isPicked,
              })}
            >
              {day - startWeekDay}
            </div>
          );
        })}
      </div>
      <div className="picked-date">
        <div className="text">Date:</div>
        <div className="date-text" data-testid="date-field-below">
          {dayDefault}
        </div>
      </div>
    </div>
  );
};

CalendarCustom.propTypes = {
  startYear: PropTypes.number,
  endYear: PropTypes.number,
  onSelectedDate: PropTypes.func,
};
export { CalendarCustom };
