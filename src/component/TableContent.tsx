import React, { createContext, useContext, useEffect, useState } from "react";

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
import { useGet, usePatch } from "../CustomHook/APIHook";
import EditElement from "./EditElement";
import { useDataContext, DataContextType } from "./MainHomeComponent";
import DeleteElement from "./DeleteElement";

interface Row {
  id: number;
  title?: string;
  description?: string;
  status: boolean;
}

export type EditComponentContextType = {
  isShowComponent?: boolean;
  setIsShowComponent?: any;
  title?: string;
  description?: string;
  id?: number;
  data?: any;
  error?: any;
  setNewRequestBody?: any;
  editItem?: any;
  setEditItem?: any;
};

export type DeleteComponentContextType = {
  isShowComponent?: boolean;
  setIsShowComponent?: any;
  id?: number;
  setNewDeleteRequestBody?: any;
  deleteError?: any;
  setTodoId?: any;
  deleteItem?: any;
  setDeleteItem?: any;
};

export const EditComponentContext = createContext(
  undefined as EditComponentContextType
);
export const useEditComponentContext = () =>
  useContext(EditComponentContext as undefined);

export const DeleteComponentContext = createContext(
  undefined as DeleteComponentContextType
);
export const useDeleteComponentContext = () =>
  useContext(DeleteComponentContext as undefined);

function TableContent() {
  const {
    data,
    todoId,
    setTodoId,
    editData,
    errorEditData,
    setEditRequest,
    setNewDeleteRequestBody,
    deleteError,
    editItem,
    setDeleteItem,
    deleteItem,
    setEditItem,
  } = useDataContext() as DataContextType;

  const [sortColumn, setSortColumn] = React.useState<keyof Row>("id");
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showComponentEdit, setShowComponentEdit] = useState(false);
  const [showComponentDelete, setShowComponentDelete] = useState(false);
  // const [todoId, setTodoId] = useState<number | undefined>(undefined);
  const [todoTitle, setTodoTitle] = useState<string | undefined>(undefined);
  const [todoDescription, setTodoDescription] = useState<string | undefined>(
    undefined
  );

  const {
    data: editedData,
    error,
    setNewRequestBody,
  } = usePatch(`http://localhost:8080/todo/edit-todo/${todoId}`);

  const handelOnOpenMenu = (id: number) => {
    setTodoId((prevId) => (id !== undefined ? id : prevId));
  };
  const handleChangeStatus = (status: boolean) => {
    setNewRequestBody({
      status: status,
      session_token: localStorage.getItem("session_token"),
    });
  };

  const toggleEditComponent = (
    id: number,
    title?: string,
    description?: string
  ) => {
    setTodoId((prevId) => (id !== undefined ? id : prevId));
    setTodoTitle((prevTitle) => (title !== undefined ? title : prevTitle));
    setTodoDescription((prevDescription) =>
      description !== undefined ? description : prevDescription
    );
    setShowComponentEdit(!showComponentEdit);
  };

  const toggleDeleteComponent = (id: number) => {
    setTodoId((prevId) => (id !== undefined ? id : prevId));

    setShowComponentDelete(!showComponentDelete);
  };

  const options = {
    optionOne: {
      title: "مكتملة",
      handler: () => handleChangeStatus(true),
      color: "#00939f",
      backgroundColor: "#e1fcef  ",
    },
    optionTwo: {
      title: "غير مكتملة",
      handler: () => handleChangeStatus(false),
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
    if (data && data.length > 0) {
      return data.slice().sort((a, b) => {
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
  }, [data, sortColumn, sortOrder]);

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
          {data.map((row, index) => (
            <TableRow
              sx={{ textAlign: "right", borderAxis: "none" }}
              key={row.id}
              id={"row" + row.id}
            >
              <TableCell
                sx={{
                  textAlign: "right",
                  paddingRight: 0,
                  paddingLeft: "20px",
                  width: "25px",
                }}
              >
                <DeleteIcon
                  sx={{
                    cursor: "pointer",
                    color: "rgba(23, 25, 35, 0.7)",
                    width: "25px",
                    height: "25px",
                  }}
                  onClick={() => toggleDeleteComponent(row.id)}
                ></DeleteIcon>
              </TableCell>{" "}
              <TableCell
                sx={{
                  textAlign: "right",
                  paddingRight: 0,
                  paddingLeft: 0,
                  width: "25px",
                }}
              >
                <ModeEditIcon
                  sx={{
                    cursor: "pointer",
                    color: "rgba(23, 25, 35, 0.7)",
                    width: "25px",
                    height: "25px",
                  }}
                  onClick={() =>
                    toggleEditComponent(row.id, row.title, row.description)
                  }
                ></ModeEditIcon>
              </TableCell>{" "}
              <TableCell
                sx={{
                  textAlign: "right",
                  width: "84px",
                  paddingRight: "10px",
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
                  handelOnOpenMenu={() => handelOnOpenMenu(row.id)}
                ></DropMenu>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "right",
                  paddingRight: "20px",
                  paddingLeft: "0",
                  width: "fit-content",
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
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
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
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
                {index + 1}
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
      <EditComponentContext.Provider
        value={{
          isShowComponent: showComponentEdit,
          setIsShowComponent: setShowComponentEdit,
          id: todoId,
          title: todoTitle,
          description: todoDescription,
          data: editData,
          error: errorEditData,
          setNewRequestBody: setEditRequest,
          editItem,
          setEditItem,
        }}
      >
        <EditElement></EditElement>
      </EditComponentContext.Provider>

      <DeleteComponentContext.Provider
        value={{
          isShowComponent: showComponentDelete,
          setIsShowComponent: setShowComponentDelete,
          id: todoId,
          setNewDeleteRequestBody,
          deleteError,
          setTodoId,
          deleteItem,
          setDeleteItem,
        }}
      >
        <DeleteElement></DeleteElement>
      </DeleteComponentContext.Provider>
    </TableContainer>
  );
}

export default TableContent;
