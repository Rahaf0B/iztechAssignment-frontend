import React from "react";
import styled from "styled-components";
import TableHeading from "./TableHeading";
import TableContent from "./TableContent";
interface Row {
  id: number;
  title?: string;
  description?: string;
  status: boolean;
}

const Table = () => {
  const TableContainer = styled("div")({
    width: "1020px",
    height: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "40px",
    padding: 0,
    borderRadius: "8px",
    boxShadow:
      "0 0 2px 0 rgba(0, 0, 0, 0.08), 0 1px 4px 0 rgba(69, 75, 87, 0.12), 0 0 0 1px rgba(152, 161, 178, 0.1)",
    backgroundColor: "white",
  });

  return (
    <TableContainer>
      <TableHeading></TableHeading>
      <TableContent></TableContent>
    </TableContainer>
  );
};

export default Table;
