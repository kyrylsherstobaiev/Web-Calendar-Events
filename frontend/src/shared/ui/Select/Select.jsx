import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

function Select({
  options = [
    "USA",
    "Britain",
    "Germany",
    "India",
    "UAE",
    "Australia",
    "Switzerland",
  ],
  title = "-- Select item --",
  onSelected = (value) => console.log(value),
  className,
  error,
  defaultValue,
}) {
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const [openMenu, setOpenMenu] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);

  const classesUl = classNames("items-list", className, {
    "hidden-display": closeMenu,
    "shown-display": openMenu,
  });

  const handleClick = (value) => {
    // console.log(value);
    setCurrentValue(value);
    setCloseMenu(true);
    setOpenMenu(false);
  };

  useEffect(() => {
    if (currentValue) onSelected(currentValue);
  }, [currentValue]);

  return (
    <div className="wrapper-flex">
      <div className="wrapper-select-timer" data-testid="select-test">
        <p className="title" onClick={() => setOpenMenu((prev) => !prev)}>
          {currentValue ? `${currentValue}:00` : title}
        </p>
        <ul className={classesUl} data-testid="select-list">
          {options.map((value, i) => {
            return (
              <li
                key={i + "gi"}
                className="item-one"
                onClick={() => handleClick(value)}
              >
                {`${value}:00`}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="error">{error}</div>
    </div>
  );
}

Select.propTypes = {
  title: PropTypes.string,
  onSelected: PropTypes.func,
  arrayValues: PropTypes.array,
  classNames: PropTypes.string,
};
export { Select };
