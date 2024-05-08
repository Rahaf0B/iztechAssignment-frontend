import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Button from "../component/Button";
import TextField from "../component/TextField";
import { useNavigate } from "react-router-dom";
import SideContainer from "../component/SideContainer";
import signupImg from "../utlis/assets/sign up.png";
import styled, { css } from "styled-components";
import person from "../utlis/assets/iconwrappeh.svg";
import { usePatch, usePost } from "../CustomHoook/APIHook";
import { signIn } from "../Providers/UserProvider";
interface UserData {
  user_name: string;
  email: string;
  password: string;
}

interface imageData {
  file: File;
}
function SignUp() {
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  const [isDataFilled, setIsDataFilled] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const memoizedFile = useMemo(
    () => fileInputRef.current?.files?.[0],
    [fileInputRef.current]
  );

  var {
    data,
    error,
    setNewRequestBody: setPostBody,
  } = usePost("http://localhost:8080/auth/register-user");

  var {
    data,
    error,
    setNewRequestBody: setPatchBody,
  } = usePatch("http://localhost:8080/auth/edit-profile-picture");

  useEffect(() => {
    if (data) {
      if (data.status == 400 || data.status == 409) {
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

  const handleChange = (event: any) => {
    if (event.target !== fileInputRef.current) {
      const key = event.target.id.split("-")[0];
      if (userData) {
        setUserData?.({ ...userData, [key]: event.target.value });
      }
    }
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("Name");
    const email = data.get("Email");
    const password = data.get("password");

    if (email && password && name) {
      setIsDataFilled(true);
      setPostBody({
        email: email,
        password: password,
        user_name: name,
      });
      if (localStorage.getItem("session_token") && memoizedFile) {
        setPatchBody({
          image: memoizedFile,
          session_token: localStorage.getItem("session_token"),
          contentType: "multipart/form-data",
        });
      }
    } else {
      setIsError(true);
    }
  };

  function handleClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

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
  const ContainerLabelSpan = styled("div")({
    display: "flex",
    marginBottom: "14px",
    flexDirection: "row-reverse",
    gap: "5px",
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
                name="Name"
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
                name="Email"
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
              />

              <PasswordLabelContainer>
                <PasswordLabelDescription>
                  يجب ان تتكون كلمة المرور على 8 رموز على الاقل
                </PasswordLabelDescription>
                <PasswordLabelDescription>
                  يجب ان تحتوي كلمة المرور على رموز وأرقام
                </PasswordLabelDescription>
              </PasswordLabelContainer>
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
                />
                <ImgElement
                  src={
                    memoizedFile ? URL.createObjectURL(memoizedFile) : person
                  }
                />
              </ContainerAddImage>
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
