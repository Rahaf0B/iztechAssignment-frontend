import React, { FC, forwardRef, useImperativeHandle, useRef } from "react";
import styled, { css } from "styled-components";
import { Input } from "@mui/base/Input";

import InputAdornment from "@mui/material/InputAdornment";

type TextFieldProps = {
  id?: string;
  name: string;
  className: string;
  placeholder?: string;
  size: "sm" | "md" | "lg";
  width: number;
  height: number;
  borderRadius: number;
  labelClassName?: string;
  label?: string;
  type?: string;
  border?: string;
  color?: string;
  value?: string | number;
  ref?: any;
  labelColor?: string;
  textAlign?: "right" | "left" | "center";
  handleChange?: (args: any) => void;
  Icon?: React.ReactNode;
  IconPlacement?: string;
  IconHandle?: (args: any) => void;
  onKeyDown?: (args: any) => void;
};

const TextField: FC<TextFieldProps> = forwardRef(
  (
    {
      id = "",
      name = "",
      className = "",
      placeholder = "",
      labelClassName = "",
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
      labelColor = "#171c26",
      textAlign = "right",
      Icon = null,
      onKeyDown,
      ...args
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));
    const style = {
      border,
      borderRadius,
      padding: `1rem 1rem`,
      color,
      width,
      height,
      textAlign: textAlign ? textAlign : "right",
    };

    const LabelInputField = styled("div")({
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "1.25",
      letterSpacing: "-0.15px",
      textAlign: "right",
      color: labelColor,
    });

    return (
      <div>
        <LabelInputField>{label}</LabelInputField>
        <div className={labelClassName}></div>
        <Input
          style={{ position: Icon != null ? "relative" : "static" }}
          slotProps={{
            input: {
              id: id,

              name,
              ref: inputRef,
              className,
              type,
              onChange: handleChange,
              style,
              placeholder,
              defaultValue: value,
              onKeyDown: onKeyDown,
            },
          }}
          startAdornment={
            <InputAdornment position="end" sx={{ height: "100%" }}>
              {Icon ? <span>{Icon}</span> : null}
            </InputAdornment>
          }
        ></Input>
      </div>
    );
  }
);

export default TextField;
