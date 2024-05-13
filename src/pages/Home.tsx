import React, {  useEffect, } from "react";

import Header from "../component/Header";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainHomeComponent from "../component/MainHomeComponent";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("session_token")) {
      navigate("/");
    }
  }, []);

  const LayoutComponent = styled("div")({
    backgroundColor: "#fafafa",
    height: "100vh",
  });
  return (
    <LayoutComponent>
      <Header></Header>
      <MainHomeComponent></MainHomeComponent>
    </LayoutComponent>
  );
}

export default Home;
