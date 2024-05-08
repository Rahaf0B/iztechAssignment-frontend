import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";

import NoContentImage from "../utlis/assets/empty.png";
import Button from "./Button";

function NoContent() {
  const [showComponentAdd, setShowComponentAdd] = useState(false);

  const toggleAddComponent = () => {
    setShowComponentAdd(!showComponentAdd);
  };

  const ContainerLayout = styled("div")({
    width: "1020px",
    height: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "40px",
    padding: 0,

    backgroundColor: "white",
  });
  const Heading = styled("h1")({
    height: "75px",
    fontSize: "28px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "1.2px",
    textAlign: "center",
    color: "#171923",
    marginLeft: "auto",
    width: "385px",
    marginRight: "auto",
  });

  const Container = styled("div")({
    height: "620px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  });

  return (
    <ContainerLayout>
      <Container>
        <Heading>لايوجد لديك مهام حتى الان دعنا نقوم باضافة مهام جديدة</Heading>

        <Button
          className="options-button"
          id="btn-add-todo-form"
          backgroundColor="#00939f"
          label="اضافة مهمة"
          color="white"
          height={52}
          width={220}
          borderRadius={10}
          handleClick={toggleAddComponent}
          fontSize={16}
        ></Button>

        <img src={NoContentImage} width={"385px"} />
      </Container>
    </ContainerLayout>
  );
}

export default NoContent;
