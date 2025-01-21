import React from "react";
import PropTypes from "prop-types";
import * as icon from "../icons/index.js";

function Icon({ name = "", width, height, color = "white" }) {
  const iconComponents = {
    play: icon.Play,
    pause: icon.Pause,
    "angle-down": icon.AngleDown,
    "angle-up": icon.AngleUp,
    "angle-left": icon.AngleLeft,
    "angle-right": icon.AngleRight,
    close: icon.Close,
    "open-eye": icon.OpenEye,
    "close-eye": icon.CloseEye,
    cart: icon.Cart,
    "checkbox-fill": icon.CheckboxFill,
    "checkbox-line": icon.CheckboxLine,
    color: icon.Color,
    "color-selected": icon.ColorSelected,
    "down-small": icon.DownSmall,
    google: icon.Google,
    plus: icon.Plus,
    minus: icon.Plus,
    information: icon.Information,
    player: icon.Player,
    success: icon.Success,
    trash: icon.Trash,
    truck: icon.Truck,
    "user-icon": icon.UserIcon,
  };

  const SelectedComponent = iconComponents[name];

  return (
    name && <SelectedComponent color={color} width={width} height={height} />
  );
}

Icon.propTypes = {
  name: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
};

export { Icon };
