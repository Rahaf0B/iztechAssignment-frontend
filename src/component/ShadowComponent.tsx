import React, { useContext, useEffect } from "react";
import styled from "styled-components";


interface LayoutProps {
  showElement: boolean;
  children: React.ReactNode;
}
function ShadowComponent(props: LayoutProps) {
  const ContainerLayout = styled("div")({
    width: "100vw",
    height: "100vh",
    zIndex: 999,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    position: "fixed",
    top: 0,
    left: 0,
    display: props.showElement ? "block" : "none",
  });

  return <ContainerLayout>{props.children}</ContainerLayout>;
}

export default ShadowComponent;
