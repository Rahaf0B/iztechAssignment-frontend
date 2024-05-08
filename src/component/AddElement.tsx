import React, { useContext, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

import styled from "styled-components";
import TextField from "./TextField";
import Button from "./Button";

function AddElement() {
  const ContainerLayout = styled("div")({
    width: "439px",
    height: "490px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10%",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow:
      " 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  });

  const ContainerFlex = styled("div")({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "32px",
    padding: "24px",
  });

  const ComponentHeader = styled("div")({
    width: "100%",
    height: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  });

  const HeaderText = styled("div")({
    width: "fit-content",

    fontSize: "20px",
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "right",
    color: "#171923",
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

  return (
    <ContainerLayout>
      <ContainerFlex>
        <ComponentHeader>
          <CloseIcon></CloseIcon>
          <HeaderText>اضافة مهمة جديدة</HeaderText>
        </ComponentHeader>
        <ContainerTextField>
          <TextField
            id="Title-add"
            name="title"
            labelClassName="label-title-add"
            className="TextField-title-add"
            placeholder="ادخل عنوان المهمة"
            width={391}
            height={54}
            size="md"
            label="عنوان المهمة"
            labelColor="#171c26"
            type="text"
            handleChange={() => {}}
            borderRadius={10}
            border={`1px solid  #E1E8F1`}
          />
          <LabelInputField className="label-description-add">
            الوصف
          </LabelInputField>
          <TextParagraph
            className="TextField-description-add"
            placeholder="... ادخل الوصف "
          ></TextParagraph>
        </ContainerTextField>

        <ContainerButton>
          <Button
            className="options-button"
            id="btn-add-todo"
            backgroundColor="#00939f"
            label="اضافة مهمة"
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

export default AddElement;
