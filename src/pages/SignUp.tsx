import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Button from "../component/Button";
import TextField from "../component/TextField";
import { useNavigate } from "react-router-dom";
import SideContainer from "../component/SideContainer";
import signupImg from "../utlis/assets/sign up.png";
import styled, { css } from "styled-components";
import { usePatch, usePost } from "../CustomHook/APIHook";
import { signIn } from "../Providers/UserProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddImage from "../component/AddImage";

interface UserData {
  user_name: string;
  email: string;
  password: string;
}

function SignUp() {
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  const [isDataFilled, setIsDataFilled] = useState(false);
  const [userData, setUserData] = useState<UserData | null>({
    user_name: null,
    email: null,
    password: null,
  });

  var {
    data,
    error,
    status,
    setNewRequestBody: setPostBody,
  } = usePost("http://localhost:8080/auth/register-user");

  var {
    data: patchData,
    error: patchError,
    status: patchStatus,
    setNewRequestBody: setPatchBody,
  } = usePatch("http://localhost:8080/auth/edit-profile-picture");

  localStorage.clear();

  useEffect(() => {
    if (patchStatus == 200) {
      navigate("/home");
    } else {
      if (localStorage.getItem("img_file")) {
        setIsError(true);
      }
    }
  }, [patchData, patchError, patchStatus]);
  useEffect(() => {
    if (status == 400 || status == 409) {
      setIsError(true);
    } else if (data) {
      const sessionToken: string | undefined = data?.session_token;
      if (sessionToken)
     { signIn(sessionToken);}

      if (
        localStorage.getItem("session_token") &&
        localStorage.getItem("img_file")
      ) {
        setPatchBody({
          image: localStorage.getItem("img_file"),
          session_token: localStorage.getItem("session_token"),
          contentType: "multipart/form-data",
        });
      }
      navigate("/home");
      setIsError(false);
    } else {
      if (isDataFilled) {
        setIsError(true);
      }
    }
  }, [data, error, status, navigate]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("user-name");
    const email = data.get("email");
    const password = data.get("password");
    if (email && password && name) {
      setIsDataFilled(true);
      setPostBody({ email: email, password: password, user_name: name });
    } else {
      setIsError(true);
    }
  };

  const LabelTextNoAccount = styled("h1")({
    height: "12px",
    width: "fit-content",
    fontSize: "14px",
    color: "#171c26",
  });

  const ComponentContainer = styled("h1")({
    height: "fit-content",
    marginTop: "5%",
  });

  const PasswordLabelDescription = styled("P")({
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.43,
    letterSpacing: "-0.15px",
    textAlign: "right",

    color: "rgba(23, 28, 38, 0.5)",
  });

  const PasswordLabelContainer = styled("div")({
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    marginBottom: "18px",
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
      header={"هيا لنبدء رحلتك سويا"}
      paragraph={
        "قم بانشاء حساب مجاني تماماً في موقع مهمتك, ودعنا نرتب مهامك سويا"
      }
      imgSrc={signupImg}
      flexDirection="row-reverse"
    >
      <div className="login-data-box signup-data-box solid">
        <ComponentContainer>
          <h1 className="page-label"> انشاء حساب</h1>
          <div className="form-box solid">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <TextField
                id="user_name-signup"
                name="user-name"
                labelClassName="label-name-login-signup"
                className="TextField-name-login-signup"
                placeholder="معاوية"
                width={584}
                height={54}
                size="md"
                label="اسم المستخدم"
                borderRadius={10}
                labelColor={isError ? "#e00909" : "#171c26"}
                border={`1px solid ${isError ? "#e00909" : "#E1E8F1"}`}
                value={userData?.user_name}
                handleChange={() => {}}
              />
              <TextField
                id="email-signup"
                name="email"
                labelClassName="label-Email-login-signup"
                className="TextField-Email-login-signup"
                placeholder="example@gmail.com"
                width={584}
                height={54}
                size="md"
                label="البريد الالكتروني"
                type="email"
                handleChange={() => {}}
                borderRadius={10}
                labelColor={isError ? "#e00909" : "#171c26"}
                border={`1px solid ${isError ? "#e00909" : "#E1E8F1"}`}
                value={userData?.email}
              />
              <TextField
                id="password-signup"
                name="password"
                className="TextField-password-login-signup"
                labelClassName="label-password-login-signup"
                placeholder="كلمة المرور"
                width={584}
                height={54}
                size="md"
                handleChange={() => {}}
                borderRadius={10}
                label="كلمة المرور "
                type="password"
                value={userData?.password}
                border={`1px solid ${isError ? "#e00909" : "#E1E8F1"}`}
                labelColor={isError ? "#e00909" : "#171c26"}
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
              />

              <PasswordLabelContainer>
                <PasswordLabelDescription>
                  يجب ان تتكون كلمة المرور على 8 رموز على الاقل
                </PasswordLabelDescription>
                <PasswordLabelDescription>
                  يجب ان تحتوي كلمة المرور على رموز وأرقام
                </PasswordLabelDescription>
              </PasswordLabelContainer>

              <AddImage></AddImage>

              <div className="div-btn-login-form-login">
                <Button
                  className="options-button"
                  id="btn-signup-form"
                  backgroundColor="#00939f"
                  label="انشاء حساب"
                  type="submit"
                  color="white"
                  height={60}
                  width={584}
                  borderRadius={10}
                  fontSize={20}
                  handleClick={() => {}}
                ></Button>
              </div>
            </form>
          </div>

          <div className="create-account-login-form">
            <LabelTextNoAccount>{"هل لديك حساب بلفعل؟ "}</LabelTextNoAccount>
            <div className="div-Forget-password">
              <a href={"/"}>
                <Button
                  className="options-button"
                  id="btn-sign-up-login-form"
                  backgroundColor="transparent"
                  label="تسجيل الدخول"
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

export default SignUp;
