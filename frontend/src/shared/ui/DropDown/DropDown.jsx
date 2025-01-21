import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon/index.js";
import classNames from "classnames";

function DropDown({ listArray = ["day", "week"], onSelected }) {
  const [selectedItem, setSelectedItem] = useState("-Select -");

  const [isAppearList, setIsAppearList] = useState(false);

  const handleChooseItem = (value) => {
    setSelectedItem(value);
    if (onSelected) onSelected(value);
    setIsAppearList(false);
  };

  const appearList = () => {
    setIsAppearList(true);
  };

  const disappearList = () => {
    setIsAppearList(false);
  };

  return (
    <div className="wrapper-dropdown">
      <div
        className="dropdown-content"
        onMouseEnter={appearList}
        onMouseLeave={disappearList}
        data-testid="dropdown-content"
        data-item={selectedItem}
      >
        {selectedItem}
        <div
          data-testid="icon-direction"
          className={classNames("iconImgDown", {
            iconImgUp: isAppearList,
          })}
        >
          <Icon name={"down-small"} color={"black"} />
        </div>
        <div
          role="listitem"
          data-testid="listitem"
          className={classNames("list", { "appear-list": isAppearList })}
        >
          {listArray.map((item, i) => {
            return (
              <div
                data-testid="item-pick-list"
                onClick={() => handleChooseItem(item)}
                key={i + "g"}
                className={classNames("list-item", {
                  "picked-item": selectedItem === item,
                })}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

DropDown.propTypes = {
  listArray: PropTypes.array,
};
export { DropDown };
