import React, { useState } from "react";
import { BiSearch, BiFilter } from "react-icons/bi";
import FilterAlt from "@mui/icons-material/FilterAlt";
import DropMenu from "./DropMenu";
import styled from "styled-components";
import TextField from "./TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "./Button";

const TableHeading = () => {
  const [showComponentAdd, setShowComponentAdd] = useState(false);

  const toggleAddComponent = () => {
    setShowComponentAdd(!showComponentAdd);
  };
  const options = {
    optionOne: {
      title: "عرض الجميع",
      handler: () => {},
      color: "#5d5e65  ",
    },
    optionTwo: {
      title: "عرض المكتمل",
      handler: () => {},
      color: "#5d5e65  ",
    },
    optionThree: {
      title: "عرض الغير مكتمل",
      handler: () => {},
      color: "#5d5e65  ",
    },
  };

  const ElementContainer = styled("div")({
    width: "100%",
    height: "64px",
    padding: " 0",
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
    justifyContent: "space-between",
  });

  const SearchElementContainer = styled("div")({
    width: "fit-content",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",

    justifyContent: "flex-start",
    gap: "16px",
    padding: 0,
  });
  return (
    <ElementContainer>
      <Button
        className="options-button"
        id="btn-add-todo-form"
        backgroundColor="#00939f"
        label="اضافة مهمة"
        color="white"
        height={32}
        width={117}
        borderRadius={10}
        handleClick={toggleAddComponent}
        fontSize={14}
      ></Button>
      <SearchElementContainer>
        <TextField
          id="search"
          name="search"
          labelClassName="label-search"
          className="TextField-search"
          placeholder="البحث"
          width={320}
          height={32}
          size="md"
          handleChange={() => {}}
          borderRadius={10}
          border={"solid 1px #cbd5e0"}
          value={""}
        />
        <DropMenu
          options={options}
          icon={
            <FilterAlt
              sx={{
                fillOpacity: 0.5,
                margin: 0,
                padding: 0,
                width: "18px",
                height: "18px",
              }}
            />
          }
          elementWidth={"40px"}
          elementHeight={"32px"}
          elementBorder="solid 1px #cbd5e0"
          elementBorderRadius={6}
        ></DropMenu>
      </SearchElementContainer>
    </ElementContainer>
  );
};

export default TableHeading;
