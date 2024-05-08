import React, { useContext, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

import styled from "styled-components";
import TextField from "./TextField";
import Button from "./Button";

import deleteImage from "../utlis/assets/delete.png";

function DeleteElement() {
  const ContainerLayout = styled("div")({
    width: "439px",
    height: "490px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10%",
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "8px",
    boxShadow:
      " 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  });

  const ContainerFlex = styled("div")({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "32px",
  });

  const ContainerTextField = styled("div")({
    height: "fit-content",
  });
  const ContainerButton = styled("div")({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  });
  const TextParagraph = styled("textarea")({
    resize: "none",
    width: "391px",
    height: "150px",
    padding: "1rem 1rem",
    textAlign: "right",

    border: `1px solid  #E1E8F1`,
    borderRadius: "10px",
  });

  const LabelInputField = styled("div")({
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "1.25",
    letterSpacing: "-0.15px",
    textAlign: "right",
    color: "#171923",
  });

  const TextContainer = styled("div")({
    width: "100%",
    fontSize: "16px",
    textAlign: "center",
  });
  return (
    <ContainerLayout>
      <ContainerFlex>
        <img src={deleteImage} style={{ width: "200px" }} />

        <TextContainer>هل حقا تود حذف المهمة</TextContainer>
        <TextContainer>
          انت على وشك حذف هذا المهمة, اذا قمت بلاستمرار في هذه العملية سيتم حذف
          هذه المهمة من قائمة المهمام
        </TextContainer>

        <ContainerButton>
          <Button
            className="options-button"
            id="btn-add-todo"
            backgroundColor="#e00909 "
            label="تعديل المهمة"
            type="submit"
            color="white"
            height={40}
            width={102}
            borderRadius={10}
            handleClick={() => {}}
            fontSize={12}
          ></Button>
          <Button
            className="options-button"
            id="btn-cancel-todo"
            backgroundColor="#fff"
            label="الغاء العملية"
            type="submit"
            color="#171923"
            height={40}
            width={102}
            borderRadius={10}
            handleClick={() => {}}
            fontSize={12}
          ></Button>
        </ContainerButton>
      </ContainerFlex>
    </ContainerLayout>
  );
}

export default DeleteElement;
