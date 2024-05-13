import React, { useContext, useEffect } from "react";

import styled from "styled-components";
import websiteIcon from "../utlis/assets/logo.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";

import DropMenu from "./DropMenu";
function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const options = {
    optionOne: {
      title: "تسجيل الخروج",
      handler: logout,
      color: "#e00909 ",
    },
  };

  function convertStringToFile() {
    const fileData = localStorage.getItem("img_file");

    const blob = new Blob([fileData], { type: "application/octet-stream" });
    const objectURL = URL.createObjectURL(blob);
    return objectURL;
  }

  const Header = styled("header")({
    width: "100%",
    height: "84px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "22px 240px",
    boxShadow: "inset 0 -1px 1px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  });

  const ContainerOptions = styled("div")({
    width: "fit-content",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "16px",
    padding: 0,
  });

  const ImageContainer = styled("img")({
    width: "40px",
    height: "40px",
    padding: 0,
    borderRadius: "999px",
    backgroundColor: "rgba(203, 213, 224, 0.7)",
  });

  const IconContainer = styled("img")({
    width: "40px",
    height: "40px",
  });
  return (
    <Header>
      <ContainerOptions>
        <DropMenu
          options={options}
          icon={<KeyboardArrowDownIcon />}
          elementWidth={"fit-content"}
          elementHeight={"fit-content"}
          elementBorder="none"
          elementBorderRadius={0}
        ></DropMenu>
        <ImageContainer
          src={localStorage.getItem("img_file") ? convertStringToFile() : null}
        ></ImageContainer>
      </ContainerOptions>
      <IconContainer src={websiteIcon} />
    </Header>
  );
}

export default Header;
