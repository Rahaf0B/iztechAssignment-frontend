import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
  TablePagination,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import styled from "styled-components";
import TableFooter from "./TableFooter";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DropMenu from "./DropMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useGet } from "../CustomHoook/APIHook";

interface Row {
  id: number;
  title?: string;
  description?: string;
  status: boolean;
}

interface LayoutProps {
  data: Row[];
}
function TableContent(props: LayoutProps) {
  const [sortColumn, setSortColumn] = React.useState<keyof Row>("id");
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showComponentEdit, setShowComponentEdit] = useState(false);
  const [showComponentDelete, setShowComponentDelete] = useState(false);

  const toggleEditComponent = () => {
    setShowComponentEdit(!showComponentEdit);
  };

  const toggleDeleteComponent = () => {
    setShowComponentDelete(!showComponentDelete);
  };

  const options = {
    optionOne: {
      title: "مكتملة",
      handler: () => {},
      color: "#00939f",
      backgroundColor: "#e1fcef  ",
    },
    optionTwo: {
      title: "غير مكتملة",
      handler: () => {},
      color: "#171923",
      backgroundColor: "#e9edf5   ",
    },
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {};

  const handleSort = (column: any) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedRows = React.useMemo(() => {
    if (props.data && props.data.length > 0) {
      return props.data.slice().sort((a, b) => {
        const aValue = a[sortColumn] || "";
        const bValue = b[sortColumn] || "";

        if (sortOrder === "asc") {
          return aValue.toString().localeCompare(bValue.toString());
        } else {
          return bValue.toString().localeCompare(aValue.toString());
        }
      });
    } else {
      return [];
    }
  }, [props.data, sortColumn, sortOrder]);

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const ArrowContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });
  return (
    <TableContainer>
      <Table sx={{ "& td": { border: 0 } }}>
        <TableHead sx={{ height: "40px", backgroundColor: "white" }}>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell sx={{ textAlign: "right" }}>الحالة</TableCell>
            <TableCell sx={{ textAlign: "right", width: "400px" }}>
              الوصف
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "right",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  sx={{
                    padding: "0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onClick={() => handleSort("title")}
                >
                  <ArrowDropUpIcon
                    sx={{
                      color: sortOrder === "asc" ? "#171923" : "#bcc2ce",
                      width: "fit-content",
                    }}
                  />{" "}
                  <ArrowDropDownIcon
                    sx={{
                      color: sortOrder === "asc" ? "#bcc2ce" : "#171923",
                      width: "fit-content",
                    }}
                  />
                </IconButton>
                العنوان
              </Box>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "right",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  sx={{
                    padding: "0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onClick={() => handleSort("id")}
                >
                  <ArrowDropUpIcon
                    sx={{
                      color: sortOrder === "asc" ? "#171923" : "#bcc2ce",
                      width: "fit-content",
                    }}
                  />{" "}
                  <ArrowDropDownIcon
                    sx={{
                      color: sortOrder === "asc" ? "#bcc2ce" : "#171923",
                      width: "fit-content",
                    }}
                  />
                </IconButton>
                #
              </Box>
            </TableCell>
            <TableCell></TableCell> 
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "#f9fafc", borderAxis: "none" }}>
          {props.data.map((row) => (
            <TableRow
              sx={{ textAlign: "right", borderAxis: "none" }}
              key={row.id}
            >
              <TableCell
                sx={{ textAlign: "right", paddingRight: 0, paddingLeft: 0 }}
              >
                <DeleteIcon
                  sx={{
                    cursor: "pointer",
                    color: "rgba(23, 25, 35, 0.7)",
                    width: "17px",
                    height: "17px",
                  }}
                  onClick={toggleDeleteComponent}
                ></DeleteIcon>
              </TableCell>{" "}
              <TableCell
                sx={{ textAlign: "right", paddingRight: 0, paddingLeft: 0 }}
              >
                <ModeEditIcon
                  sx={{
                    cursor: "pointer",
                    color: "rgba(23, 25, 35, 0.7)",
                    width: "17px",
                    height: "17px",
                  }}
                  onClick={toggleEditComponent}
                ></ModeEditIcon>
              </TableCell>{" "}
     
              <TableCell
                sx={{
                  textAlign: "right",
                  width: "84px",
                  paddingRight: "20px",
                  paddingLeft: "40px",
                }}
              >
                {" "}
                <DropMenu
                  options={options}
                  textColor={row.status ? "#00939f" : "#171923"}
                  backgroundColor={row.status ? "#e1fcef " : "#e9edf5 "}
                  value={row.status ? "مكتملة" : "غير مكتملة"}
                  icon={
                    <KeyboardArrowDownIcon
                      sx={{ width: "14px", height: "14px", margin: 0 }}
                    ></KeyboardArrowDownIcon>
                  }
                  elementBorder="none"
                  elementBorderRadius={4}
                  elementHeight="20px"
                  elementWidth="88px"
                ></DropMenu>{" "}
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "right",
                  paddingRight: "20px",
                  paddingLeft: "0",
                  width: "fit-content",
                  maxWidth: "350px",
                }}
              >
                {row.description}
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "right",
                  paddingRight: "20px",
                  paddingLeft: "0",
                }}
              >
                {row.title ? row.title : "بدون عنوان"}
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "right",
                  paddingRight: "20px",
                  paddingLeft: "0",
                }}
              >
                {row.id}
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "right",
                  paddingRight: "12px",
                  paddingLeft: "0",
                }}
              >
                {row.status ? (
                  <CheckCircleIcon
                    sx={{
                      color: "#00939f",
                      width: "16.7px",
                      height: "16.7px",
                    }}
                  ></CheckCircleIcon>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TableFooter
        currentPage={1}
        itemsPerPage={15}
        totalItems={20}
      ></TableFooter>
    </TableContainer>
  );
}

export default TableContent;
