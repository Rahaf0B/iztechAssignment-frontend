import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import styled from "styled-components";
import TextField from "./TextField";
import Button from "./Button";
import {
  useEditComponentContext,
  EditComponentContextType,
} from "./TableContent";
import ShadowComponent from "./ShadowComponent";
import { usePatch } from "../CustomHook/APIHook";
interface LayoutProps {
  title?: string;
  description?: string;
}

function EditElement(props: LayoutProps) {
  const {
    isShowComponent,
    setIsShowComponent,
    id,
    title,
    description,
    data,
    error,
    setNewRequestBody,
    editItem,
    setEditItem,
  } = useEditComponentContext() as EditComponentContextType;

  const [isError, setIsError] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const title = data.get("title");
    const description = data.get("description");

    setNewRequestBody({
      ...(title && { title }),
      ...(description && { description }),
      session_token: localStorage.getItem("session_token"),
    });
    setEditItem(true);
  };

  const handleCloseElement = () => {
    setIsShowComponent(false);
    setEditItem(false);
  };

  const ContainerLayout = styled("div")({
    width: "439px",
    height: "490px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow:
      " 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    left: "38%",
    top: "35%",
    position: "fixed",

    display: isShowComponent ? "block" : "none",
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
    <ShadowComponent showElement={isShowComponent as boolean}>
      <ContainerLayout>
        <ContainerFlex>
          <ComponentHeader>
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={handleCloseElement}
            ></CloseIcon>
            <HeaderText>اضافة مهمة جديدة</HeaderText>
          </ComponentHeader>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
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
                value={title}
              />
              <LabelInputField className="label-description-add">
                الوصف
              </LabelInputField>
              <TextParagraph
                className="TextField-description-add"
                placeholder="... ادخل الوصف "
                defaultValue={description}
              ></TextParagraph>
            </ContainerTextField>

            <ContainerButton>
              <Button
                className="options-button"
                id="btn-add-todo"
                backgroundColor="#6c63ff"
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
                color="#171923"
                height={40}
                width={102}
                borderRadius={10}
                handleClick={handleCloseElement}
                fontSize={12}
              ></Button>
            </ContainerButton>
          </form>
        </ContainerFlex>
      </ContainerLayout>
    </ShadowComponent>
  );
}

export default EditElement;
