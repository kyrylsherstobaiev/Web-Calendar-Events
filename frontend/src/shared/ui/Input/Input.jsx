import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Icon } from "../Icon/index.js";

function Input({
  placeholder = "Enter a text",
  label = "",
  type = "text",
  id,
  name,
  error = "",
  classNameLabel,
  classNameInput,
  disabled = false,
  register = () => console.log("There is no  react form hook register"),

  ...props
}) {
  const [isType, setIsType] = useState("password");

  const handleClick = () => {
    setIsType(isType === "password" ? "text" : "password");
  };

  // noinspection JSValidateTypes
  return (
    <label
      data-testid="label-test"
      className={classNames("custom-label", classNameLabel, {
        isDisabledInput: disabled,
      })}
    >
      {label}
      <input
        {...register(name)}
        placeholder={placeholder}
        type={type === "password" ? isType : type}
        name={name}
        id={id}
        className={classNames("input-class", classNameInput, {
          isErrorInput: error,
        })}
        {...props}
      />
      <div className="error" data-testid="error-div">
        {error}
      </div>

      {type === "password" && !disabled && (
        <button
          {...(type === "password" && { onClick: () => handleClick() })}
          className="show-pass"
          type="button"
        >
          <Icon
            name={isType === "password" ? "close-eye" : "open-eye"}
            color={"black"}
          />
        </button>
      )}
    </label>
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "date"]),
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  register: PropTypes.func,
};
export { Input };
