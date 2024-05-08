import React, { useContext, useEffect } from "react";

import styled from "styled-components";
import Button from "./Button";
import DropMenu from "./DropMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface layoutProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

function TableFooter(props: layoutProps) {
  const options = {
    optionOne: {
      title: " 15",
      handler: () => {},
      color: "#5d5e65  ",
    },
    optionTwo: {
      title: "20 ",
      handler: () => {},
      color: "#5d5e65  ",
    },
    optionThree: {
      title: "  25",
      handler: () => {},
      color: "#5d5e65  ",
    },
  };
  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);

  const handleNextPage = () => {};

  const handlePrevPage = () => {};

  const TableFooter = styled("div")({
    display: "flex",
    justifyContent: " space-between",

    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
  });

  const ContainerOptions = styled("div")({
    display: "flex",
    justifyContent: "space-around",
    gap: "20px",
    alignItems: "center",
  });
  const ContainerDescription = styled("span")({
    textAlign: "right",
    fontSize: "12px",
    fontWeight: 500,
  });

  return (
    <TableFooter>
      <ContainerOptions>
        <span>

          <Button
            className="arrow-button"
            id="btn-arrow-right"
            backgroundColor="transparent"
            label="<"
            type="submit"
            color="black"
            height={20}
            width={24}
            borderRadius={6}
            handleClick={() => {}}
            border="solid 1px #cbd5e0"
          ></Button>
          {` ${props.currentPage}/${totalPages} `}

          <Button
            className="arrow-button"
            id="btn-arrow-right"
            backgroundColor="transparent"
            label=">"
            type="submit"
            color="black"
            height={20}
            width={24}
            border="solid 1px #cbd5e0"
            borderRadius={6}
            handleClick={() => {}}
          ></Button>
        </span>
        <DropMenu
          options={options}
          elementBorder="none"
          elementBorderRadius={0}
          icon={<KeyboardArrowDownIcon />}
          elementWidth={"10px"}
          elementHeight={"fit-content"}
        ></DropMenu>
        <ContainerDescription>{" :عدد الصفوف في الصفحة "}</ContainerDescription>
      </ContainerOptions>
      <span>
        {`${(props.currentPage - 1) * props.itemsPerPage + 1} - ${Math.min(
          props.currentPage * props.itemsPerPage,
          props.totalItems
        )} of ${props.totalItems}`}
      </span>
    </TableFooter>
  );
}

export default TableFooter;
