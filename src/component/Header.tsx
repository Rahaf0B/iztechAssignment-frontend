import React, { useContext, useEffect } from "react";

import styled from "styled-components";
import websiteIcon from "../utlis/assets/logo.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import DropMenu from "./DropMenu";
function Header() {
  const options = {
    optionOne: {
      title: "تسجيل الخروج",
      handler: () => {},
      color: "#e00909 ",
    },
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Header = styled("header")({
    width: "100%",
    height: "84px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "22px 210px",
    boxShadow: "inset 0 -1px 1px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  });

  const ContainerOptions = styled("div")({
    width: "100px",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    padding: 0,
  });

  const ImageContainer = styled("img")({
    width: "50px",
    height: "50px",
    padding: 0,
    borderRadius: "999px",
    backgroundColor: "rgba(203, 213, 224, 0.7)",
  });

  const IconContainer = styled("img")({
    width: "50px",
    height: "50px",
  });
  return (
    <Header>
      <ContainerOptions>
        <DropMenu
          options={options}
          icon={<KeyboardArrowDownIcon />}
          elementWidth={"5px"}
          elementHeight={"fit-content"}
          elementBorder="none"
          elementBorderRadius={0}
        ></DropMenu>
        <ImageContainer></ImageContainer>
      </ContainerOptions>
      <IconContainer src={websiteIcon} />
    </Header>
  );
}

export default Header;
