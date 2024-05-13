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
export type SearchContextType = {
  searchText: string;
  setSearchText: any;
};
export type DataContextType = {
  data: Row[];
  todoId: number;
  setTodoId: any;
  editData?: any;
  errorEditData?: any;
  setEditRequest?: any;
  setNewDeleteRequestBody?: any;
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

export const SearchComponentContext = createContext(
  undefined as SearchContextType
);
export const useSearchComponentContext = () =>
  useContext(SearchComponentContext as undefined);

function MainHomeComponent() {
  const navigate = useNavigate();
  const [isShowComponent, setIsShowComponent] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(15);
  const [numberOfItemToDisplay, setNumberOfItemToDisplay] = useState(15);
  const [todoId, setTodoId] = useState<number | undefined>(undefined);
  const [searchText, setSearchText] = useState(null);
  const {
    data: todoInfo,
    loading: todoLoading,
    status: todoStatus,
  } = useGet(
    `http://localhost:8080/todo/?number_of_items=${numberOfItems}&page_number=${pageNumber}`
  );

  const {
    data: searchInfo,
    loading: searchLoading,
    status: searchStatus,
  } = useGet(
    `http://localhost:8080/todo/search/?title=${searchText}&number_of_items=${numberOfItems}&page_number=${pageNumber}`
  );

  const {
    data: editData,
    error: errorEditData,
    setNewRequestBody: setEditRequest,
    status: editStatue,
  } = usePatch(`http://localhost:8080/todo/edit-todo/${todoId}`);

  const { data, error, status, setNewRequestBody } = usePost(
    "http://localhost:8080/todo/add-todo"
  );

  const [isError, setIsError] = useState(false);

  const [todoData, setTodoData] = useState<Row[]>([]);
  useEffect(() => {
    if (!todoLoading && todoInfo) {
      setTodoData(todoInfo["items"]);
      setNumberOfItems(todoInfo["numberOfItems"]);
    }
  }, [todoInfo, todoLoading, numberOfItemToDisplay, pageNumber]);

  useEffect(() => {
    if (searchText && !searchLoading && searchInfo) {
      setTodoData(searchInfo["items"]);
      setNumberOfItems(searchInfo["numberOfItems"]);
    }
  }, [searchInfo, searchLoading]);

  useEffect(() => {
    if (status == 400 || status == 406) {
      setIsError(true);
    } else if (data) {
      setIsError(false);

      navigate("/home");
    } else {
    }
  }, [data, status, error]);

  useEffect(() => {
    if (editStatue == 400 || editStatue == 406) {
      setIsError(true);
    } else if (editData) {
      setIsError(false);

      navigate("/home");
    } else {
    }
  }, [editData, editStatue, errorEditData]);

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
              }}
            >
              <SearchComponentContext.Provider
                value={{ searchText, setSearchText }}
              >
                <Table></Table>
              </SearchComponentContext.Provider>
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
