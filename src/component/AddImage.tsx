import React, { useContext, useEffect, useRef, useState } from "react";

import styled from "styled-components";
import Button from "./Button";
import person from "../utlis/assets/iconwrappeh.svg";

function AddImage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setSelectedImage] = useState<any | undefined>(undefined);

  const sendData = () => {};

  const handleImageChange = (event) => {
    const file = event?.target?.files[0];
    localStorage.setItem("img_file", file);
    setSelectedImage(file);
  };

  const LayoutContainer = styled("div")({
    height: "fit-content",
    width: "100%",
  });

  const ContainerAddImage = styled("div")({
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "16px",
    borderRadius: "12px",
    marginBottom: "45px",
  });

  const ImgElement = styled("img")({
    width: "60px",
    height: "60px",
    padding: 0,
    borderRadius: "999px",
    backgroundColor: "rgba(203, 213, 224, 0.7)",
  });

  const SpanLabelImage = styled("span")({
    color: "#67728a  ",
    fontSize: "14px",
  });
  const LabelImage = styled("h1")({
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.25,
    letterSpacing: "-0.15px",
    textAlign: "left",
    color: "#171c26",
  });

  const ContainerLabelSpan = styled("div")({
    display: "flex",
    marginBottom: "14px",
    flexDirection: "row-reverse",
    gap: "5px",
  });
  function handleClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <LayoutContainer>
      {" "}
      <ContainerLabelSpan>
        <LabelImage>الصورة الشخصية</LabelImage>
        <SpanLabelImage>{"(اختياري)"}</SpanLabelImage>
      </ContainerLabelSpan>
      <ContainerAddImage>
        <Button
          className="options-button"
          id="btn-forget-password"
          backgroundColor="rgba(0, 147, 159, 0.1)"
          label="ارفاق صورة"
          height={32}
          width={95}
          color="#00939f"
          borderRadius={5}
          handleClick={handleClick}
        ></Button>
        <input
          type="file"
          id="file-upload"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <ImgElement src={image ? URL.createObjectURL(image) : person} />
      </ContainerAddImage>
    </LayoutContainer>
  );
}

export default AddImage;
