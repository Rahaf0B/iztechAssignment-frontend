import React, { useContext, useEffect } from "react";

import styled from "styled-components";
import Button from "./Button";
import DropMenu from "./DropMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  PaginationComponentContextType,
  usePaginationComponentContext,
} from "./MainHomeComponent";

interface layoutProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

function TableFooter(props: layoutProps) {
  const {
    pageNumber,
    setPageNumber,
    totalItemsCount,
    setNumberOfItems,
    ItemCountToDisplay,
    setNumberOfItemToDisplay,
  } = usePaginationComponentContext() as PaginationComponentContextType;
  const handleChangeNumberOfItem = (numberOfItems: number) => {
    
    if (ItemCountToDisplay <= totalItemsCount) {
      setNumberOfItemToDisplay(numberOfItems);
    }
  };

  const options = {
    optionOne: {
      title: "15",
      handler: () => handleChangeNumberOfItem(Number(15)),
      color: "#5d5e65  ",
    },
    optionTwo: {
      title: "20",
      handler: () => handleChangeNumberOfItem(Number(20)),
      color: "#5d5e65  ",
    },
    optionThree: {
      title: "25",
      handler: () => handleChangeNumberOfItem(Number(25)),
      color: "#5d5e65  ",
    },
  };

  const handleNextPage = () => {
    if (Math.ceil(totalItemsCount / ItemCountToDisplay) > pageNumber) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

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

  const NumberOfRowsContainer = styled("div")({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
    gap: "5px",
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
            handleClick={handlePrevPage}
            border="solid 1px #cbd5e0"
            disabled={pageNumber == 1}
          ></Button>
          {` ${pageNumber}/${Math.ceil(totalItemsCount / ItemCountToDisplay)} `}

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
            disabled={
              Math.ceil(totalItemsCount / ItemCountToDisplay) <= pageNumber
            }
            borderRadius={6}
            handleClick={handleNextPage}
          ></Button>
        </span>
        <NumberOfRowsContainer>
          <DropMenu
            options={options}
            elementBorder="none"
            elementBorderRadius={0}
            icon={<KeyboardArrowDownIcon />}
            elementWidth={"10px"}
            elementHeight={"fit-content"}
            value={
              ItemCountToDisplay &&
              totalItemsCount &&
              `${Math.min(ItemCountToDisplay, totalItemsCount)}`
            }
          ></DropMenu>
          <ContainerDescription>
            {" :عدد الصفوف في الصفحة "}
          </ContainerDescription>
        </NumberOfRowsContainer>
      </ContainerOptions>
      <span>
        {pageNumber &&
          ItemCountToDisplay &&
          totalItemsCount &&
          `${(pageNumber - 1) * ItemCountToDisplay + 1} - ${Math.min(
            pageNumber * ItemCountToDisplay,
            totalItemsCount
          )} of ${totalItemsCount}`}
      </span>
    </TableFooter>
  );
}

export default TableFooter;
