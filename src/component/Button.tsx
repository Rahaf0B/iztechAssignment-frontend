import React, { FC } from "react";
import PropTypes, { string } from "prop-types";

type ButtonFieldProps = {
  className?: string;
  id?: string;
  label: string;
  backgroundColor: string;
  color: string;
  border?: string;
  borderRadius: number;
  boxShadow?: string;
  fontSize?: number;
  width: number | string;
  height: number | string;
  type?: "submit" | "button" | "reset";
  handleClick?: (args: any) => void;
};

const Button: FC<ButtonFieldProps> = ({
  className = "Button",
  id = "btn",
  label,
  backgroundColor = "white",
  color,
  border = "none",
  borderRadius = 0,
  boxShadow = "",
  type = "button",
  fontSize = "16px",
  width,
  height,
  handleClick,
}) => {
  const style = {
    color,
    backgroundColor,
    border,
    borderRadius,
    boxShadow,
    fontSize,
    width,
    height,
    padding: 0,
  };

  return (
    <button
      className={className}
      id={id}
      onClick={handleClick}
      type={type}
      style={style}
    >
      {label}
    </button>
  );
};

export default Button;
