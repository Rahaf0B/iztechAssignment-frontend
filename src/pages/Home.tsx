import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";

import Header from "../component/Header";
import Table from "../component/Table";
import { useNavigate } from "react-router-dom";
import { useGet } from "../CustomHoook/APIHook";
import NoContent from "../component/NoContent";
interface Row {
  id: number;
  title?: string;
  description?: string;
  status: boolean;
}
function Home() {
  const navigate = useNavigate();

  const { data: todoInfo, loading: todoLoading } = useGet(
    "http://localhost:8080/todo/?number_of_items=15&page_number=1"
  );

  const [todoData, setTodoData] = useState<Row[]>([]);
  const [numberOfItems, setNumberOfItems] = useState(0);
  useEffect(() => {
    if (!todoLoading && todoInfo) {
      setTodoData(todoInfo["items"]);
      setNumberOfItems(todoInfo["numberOfItems"]);
    }
  }, [todoInfo, todoLoading]);

  useEffect(() => {
    if (!localStorage.getItem("session_token")) {
      navigate("/");
    }
  });
  return (
    <div>
      <Header></Header>

      {todoData.length > 0 ? (
        <Table data={todoData as Row[]}></Table>
      ) : (
        <NoContent></NoContent>
      )}
    </div>
  );
}

export default Home;
