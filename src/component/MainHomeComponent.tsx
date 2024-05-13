import React, { createContext, useContext, useEffect, useState } from "react";

import Header from "./Header";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import { useDelete, useGet, usePatch, usePost } from "../CustomHook/APIHook";
import NoContent from "./NoContent";
import styled from "styled-components";
import AddElement from "./AddElement";

interface Row {
  id: number;
  title?: string;
  description?: string;
  status: boolean;
}

export type AddComponentContextType = {
  isShowComponent?: boolean;
  setIsShowComponent?: any;
  data?: any;
  error?: any;
  setNewRequestBody?: any;
};

export type PaginationComponentContextType = {
  ItemCountToDisplay?: number;
  totalItemsCount?: number;
  pageNumber?: number;

  setNumberOfItems?: any;

  setPageNumber?: any;
  setNumberOfItemToDisplay?: any;
};
interface Row {
  id: number;
  title?: string;
  description?: string;
  status: boolean;
}

export type DataContextType = {
  data: Row[];
  todoId: number;
  setTodoId: any;
  editData?: any;
  errorEditData?: any;
  setEditRequest?: any;
  setNewDeleteRequestBody?: any;
  deleteError?: any;
  editItem?: any;
  setEditItem?: any;
  deleteItem?: any;
  setDeleteItem?: any;
};

export const AddComponentContext = createContext(
  undefined as AddComponentContextType
);
export const useAddComponentContext = () =>
  useContext(AddComponentContext as undefined);

export const DataContext = createContext(undefined as DataContextType);
export const useDataContext = () => useContext(DataContext as undefined);

export const PaginationComponentContext = createContext(
  undefined as PaginationComponentContextType
);
export const usePaginationComponentContext = () =>
  useContext(PaginationComponentContext as undefined);

function MainHomeComponent() {
  const navigate = useNavigate();
  const [isShowComponent, setIsShowComponent] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(15);
  const [numberOfItemToDisplay, setNumberOfItemToDisplay] = useState(15);
  const [todoId, setTodoId] = useState<number | undefined>(undefined);
  const [deleteItem, setDeleteItem] = useState<boolean | undefined>(false);
  const [editItem, setEditItem] = useState<boolean | undefined>(false);

  const { data: todoInfo, loading: todoLoading } = useGet(
    `http://localhost:8080/todo/?number_of_items=${numberOfItems}&page_number=${pageNumber}`
  );

  const {
    data: editData,
    error: errorEditData,
    setNewRequestBody: setEditRequest,
  } = usePatch(`http://localhost:8080/todo/edit-todo/${todoId}`);
  const { error: deleteError, setNewRequestBody: setNewDeleteRequestBody } =
    useDelete(`http://localhost:8080/todo/${deleteItem ? todoId : -1}`);
  const { data, error, setNewRequestBody } = usePost(
    "http://localhost:8080/todo/add-todo"
  );

  const [isError, setIsError] = useState(false);

  const [todoData, setTodoData] = useState<Row[]>([]);
  useEffect(() => {
    if (!todoLoading && todoInfo) {
      setTodoData(todoInfo["items"]);
      setNumberOfItems(todoInfo["numberOfItems"]);
    }
  }, [
    todoInfo,
    todoLoading,
    numberOfItemToDisplay,
    pageNumber,
    setNewRequestBody,
    setEditRequest,
    setNewDeleteRequestBody,
    editItem,
    deleteItem,
  ]);

  useEffect(() => {
    if (data) {
      if (data.status == 400 || data.status == 406) {
        setIsError(true);
      } else {
        setIsError(false);

        navigate("/home");
      }
    } else {
    }
  }, [data, error]);

  const LayoutComponent = styled("div")({
    backgroundColor: "#fafafa",
  });
  return (
    <LayoutComponent>
      <AddComponentContext.Provider
        value={{
          isShowComponent,
          setIsShowComponent,
          data,
          error,
          setNewRequestBody,
        }}
      >
        {numberOfItems > 0 ? (
          <PaginationComponentContext.Provider
            value={{
              pageNumber,
              setPageNumber,
              totalItemsCount: numberOfItems,
              setNumberOfItems,
              ItemCountToDisplay: numberOfItemToDisplay,
              setNumberOfItemToDisplay,
            }}
          >
            <DataContext.Provider
              value={{
                data: todoData,
                todoId,
                setTodoId,
                editData: editData,
                errorEditData: errorEditData,
                setEditRequest: setEditRequest,
                setNewDeleteRequestBody,
                deleteError,
                editItem,
                setDeleteItem,
                deleteItem,
                setEditItem,
              }}
            >
              <Table></Table>
            </DataContext.Provider>
          </PaginationComponentContext.Provider>
        ) : (
          <NoContent></NoContent>
        )}
        <AddElement></AddElement>
      </AddComponentContext.Provider>
    </LayoutComponent>
  );
}

export default MainHomeComponent;
