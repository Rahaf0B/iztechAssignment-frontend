import React, {createContext, useContext, useEffect, useState } from "react";


import Header from "../component/Header";
import Table from "../component/Table";
import { useNavigate } from "react-router-dom";
import { useGet, usePost } from "../CustomHook/APIHook";
import NoContent from "../component/NoContent";
import styled from "styled-components";
import AddElement from "../component/AddElement";
import MainHomeComponent from "../component/MainHomeComponent";





function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("session_token")) {
      navigate("/");
    }
  });
  
  const LayoutComponent=styled("div")({
    backgroundColor:"#fafafa"
  })
  return (
    <LayoutComponent>
      <Header></Header>
      <MainHomeComponent></MainHomeComponent>

    </LayoutComponent>
  );
}

export default Home;
