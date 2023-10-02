// Header buttons  Add Task Button
import React from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

const HeaderButton = ({ type, variant = "primary", children, ...rest }) => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
      ])}
      {...rest}
    >
      {children}
    </button>
  );
};

export default HeaderButton;
