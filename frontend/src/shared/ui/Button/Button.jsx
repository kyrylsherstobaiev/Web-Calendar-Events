// noinspection JSValidateTypes

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Icon } from "../Icon/index.js";

function Button({
  children = "Button",
  handleClick,
  className,
  disabled = false,
  icon,
  name = "",
  color = "white",
  width,
  height,
  ...props
}) {
  const Tag = props.href ? "a" : "button";
  const classes = classNames("button", className, {
    isDisabled: Tag === "a" && disabled,
  });

  const isAction = (e) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <div className="container-button">
      <Tag
        onClick={Tag === "button" ? handleClick : isAction}
        className={classes}
        disabled={disabled}
        {...props}
        style={{ width: width }}
      >
        <Icon name={name} />
        {children}
      </Tag>
    </div>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export { Button };
