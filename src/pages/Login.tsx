import React, { useContext, useEffect } from "react";
import Button from "../component/Button";
import TextField from "../component/TextField";
import { useNavigate } from "react-router-dom";
import SideContainer from "../component/SideContainer";
import loginImg from "../utlis/assets/sign in.png";
import styled, { css } from "styled-components";
import { usePost } from "../CustomHook/APIHook";
import { signIn } from "../Providers/UserProvider";
import errorIcone from "../utlis/assets/Icon _ Alert.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SignIn() {
  const navigate = useNavigate();

  const [isError, setIsError] = React.useState(false);
  const [isDataFilled, setIsDataFilled] = React.useState(false);

  const { data, error, setNewRequestBody } = usePost(
    "http://localhost:8080/auth/login"
  );
  useEffect(() => {
    if (data) {
      if (data.status == 400 || data.status == 406) {
        setIsError(true);
      } else {
        signIn(data?.session_token as string);
        navigate("/home");
        setIsError(false);
      }
    } else {
      if (isDataFilled) {
        setIsError(true);
      }
    }
  }, [data, error, navigate]);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("Email");
    const password = data.get("password");
    if (email && password) {
      setIsDataFilled(true);
      setNewRequestBody({
        email: email,
        password: password,
      });
    } else {
      setIsError(true);
    }
  };

  const ContainerForgetPassword = styled("div")({
    width: "fit-content",
    textAlign: "left",
  });

  const LabelTextNoAccount = styled("h1")({
    height: "12px",
    width: "fit-content",
    fontSize: "14px",
    color: "#171c26",
  });

  const ComponentContainer = styled("h1")({
    height: "fit-content",
    marginTop: "20%",
  });

  const ErrorContainer = styled("div")({
    width: "100%",
    height: "32px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    padding: "0 16px",
    borderRadius: "4px",
  });
  const ErrorText = styled("span")({
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#e00909",
  });

  const ErrorIcon = styled("img")({
    width: "19.5px",
    height: "19.5px",
  });

  const ContainerIconDevider = styled("div")({
    display: "flex",
    height: "100%",
    zIndex: 1,
    position: "absolute",
    alignItems: "center",
    gap: "14px",
    marginLeft: "15px",
  });
  const DividerVertical = styled("div")({
    width: "1px",
    height: "40px",
    backgroundColor: "#cfd9e0",
  });
  return (
    <SideContainer
      header={"مرحبا بك في موقع مهمتك"}
      paragraph={
        "مهمتك هو عبارة عن موقع الكتروني يساعدك في انجاز مهامك بسهولة "
      }
      imgSrc={loginImg}
      flexDirection="row"
    >
      <div className="login-data-box solid">
        <ComponentContainer>
          <h1 className="page-label">تسجيل دخول</h1>
          <div className="form-box solid">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <TextField
                id="Email-login"
                name="Email"
                labelClassName="label-Email-login-signup"
                className="TextField-Email-login-signup"
                placeholder="example@gmail.com"
                width={584}
                height={54}
                size="md"
                label="البريد الالكتروني"
                labelColor={isError ? "#e00909" : "#171c26"}
                type="email"
                handleChange={() => {}}
                borderRadius={10}
                border={`1px solid ${isError ? "#e00909" : "#E1E8F1"}`}
              />
              <TextField
                id="password"
                name="password"
                className="TextField-password-login-signup"
                labelClassName="label-password-login-signup"
                placeholder="@#*%"
                width={584}
                height={54}
                size="md"
                handleChange={() => {}}
                borderRadius={10}
                label="كلمة المرور "
                labelColor={isError ? "#e00909" : "#171c26"}
                type="password"
                Icon={
                  <ContainerIconDevider>
                    <VisibilityIcon
                      style={{
                        border: "none",
                        color: "black",
                        height: 25,
                        width: 25,
                        borderRadius: "50%",
                      }}
                    />
                    <DividerVertical />
                  </ContainerIconDevider>
                }
                border={`1px solid ${isError ? "#e00909" : "#E1E8F1"}`}
              />

              <ContainerForgetPassword>
                <a href={"/forgetPassword"}>
                  <Button
                    className="options-button"
                    id="btn-forget-password"
                    backgroundColor="transparent"
                    label="نسيت كلمة المرور؟"
                    height={"fit-content"}
                    width={"fit-content"}
                    type="reset"
                    color="#00939f"
                    borderRadius={5}
                    handleClick={() => {
                      navigate("/forgetPassword");
                    }}
                  ></Button>
                </a>
              </ContainerForgetPassword>
              {isError ? (
                <ErrorContainer>
                  <ErrorText>
                    عذراً, يبدو ان هنالك خطأ في كلمة البريد الالكتروني او كلمة
                    المرور
                  </ErrorText>
                  <ErrorIcon src={errorIcone} />
                </ErrorContainer>
              ) : null}
              <div className="div-btn-login-form-login">
                <a href={"/"}>
                  <Button
                    className="options-button"
                    id="btn-login-form"
                    backgroundColor="#00939f"
                    label="تسجيل الدخول"
                    type="submit"
                    color="white"
                    height={60}
                    width={584}
                    borderRadius={10}
                    handleClick={() => {}}
                  ></Button>
                </a>
              </div>
            </form>
          </div>

          <div className="create-account-login-form">
            <LabelTextNoAccount>{"ليس لديك حساب؟"}</LabelTextNoAccount>
            <div className="div-Forget-password">
              <a href={"/register"}>
                <Button
                  className="options-button"
                  id="btn-sign-up-login-form"
                  backgroundColor="transparent"
                  label="أنشاء حساب"
                  height={27}
                  width={"fit-content"}
                  fontSize={18}
                  color="#00939f"
                  borderRadius={5}
                  handleClick={() => {}}
                ></Button>
              </a>
            </div>
          </div>
        </ComponentContainer>
      </div>
    </SideContainer>
  );
}

export default SignIn;
