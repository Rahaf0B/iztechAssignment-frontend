import React, { useContext, useEffect } from "react";

import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
  imgSrc: string;
  header: string;
  paragraph: string;
  flexDirection: "row" | "row-reverse";
}
function SideContainer(props: LayoutProps) {
  const TextHeading = styled("h1")({
    fontSize: "40px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#f7fafc",
  });

  const TextParagraph = styled("p")({
    width: "418.5px",
    height: "60px",
    flexGrow: 0,
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#f7fafc",
  });

  const CustomeInputLayout = styled("div")({
    width: "100%",
    height: "100%",
    flexGrow: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "24px",
    padding: 0,
  });

  const DisplayImg = styled("img")({
    width: "500px",
  });

  return (
    <div className="side-container ">
      <div
        className="side-image-container-box solid"
        style={{ flexDirection: props.flexDirection }}
      >
        <div className="container-img-box">
          <CustomeInputLayout>
            <DisplayImg src={props.imgSrc}></DisplayImg>
            <TextHeading>{props.header}</TextHeading>
            <TextParagraph> {props.paragraph}</TextParagraph>
          </CustomeInputLayout>
        </div>

        {props.children}
      </div>
    </div>
  );
}

export default SideContainer;
