import React, { FC } from "react";
import styled, { css } from "styled-components";

type TextFieldProps = {
  id?: string;
  name: string;
  className: string;
  placeholder?: string;
  size: "sm" | "md" | "lg" ;
  width:number;
  height:number;
  borderRadius: number;
  labelClassName?:string;
  label?: string;
  type?: string;
  border?: string;
  color?: string;
  value?: string | number;
  ref?: any;
  labelColor?: string
  textAlign?:"right" | "left" | "center";
  handleChange?: (args:any) => void;
};

const TextField: FC<TextFieldProps> = ({
  id = "",
  name = "",
  className = "",
  placeholder = "",
  labelClassName="",
  size,
  width,
  height,
  color = "black",
  handleChange,
  borderRadius = 0,
  label = "",
  type = "text",
  border = "",
  value = "",
  labelColor="#171c26",
  ref,
  textAlign="right",
}) => {
  let scale = 4;
  if (size === "sm") {
    scale = 3;
  } else if (size === "lg") {
    scale = 8;
  }
  const style = {
    border,
    borderRadius,
    padding: `1rem 1rem`,
    color,
    width,
    height,
    textAlign:textAlign ? textAlign : "right" ,

  };

  const LabelInputField= styled('div')({
   
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "1.25",
    letterSpacing: "-0.15px",
    textAlign:"right",
    color:labelColor,
  })

  return (
    <div>
      <LabelInputField >{label}</LabelInputField>
      <div className={labelClassName}></div>
      <input
        id={id}
        name={name}
        ref={ref}
        className={className}
        type={type}
        onChange={handleChange}
        style={style}
        placeholder={placeholder}
        defaultValue={value}
      ></input>
    </div>
  );
};

export default TextField;
