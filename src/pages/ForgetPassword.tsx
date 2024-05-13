import React, { useContext, useEffect, useState } from "react";
import Button from "../component/Button";
import TextField from "../component/TextField";
import { useNavigate } from "react-router-dom";
import SideContainer from "../component/SideContainer";
import passwordImage from "../utlis/assets/forget password 1.png";
import styled, { css } from "styled-components";
import person from "../utlis/assets/iconwrappeh.svg";
import { usePost, usePut } from "../CustomHook/APIHook";
import errorIcone from "../utlis/assets/Icon _ Alert.svg";
interface Iuser {
  Email: string;
}
function ForgetPassword() {
  const [user, setUser] = useState<Iuser>();
  const navigate = useNavigate();
  const [isDataFilled, setIsDataFilled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const { data, error,status, setNewRequestBody } = usePut(
    "http://localhost:8080/auth/send-opt-code"
  );

  useEffect(() => {
    if (status == 400 || status == 404) {
      setIsError(true);
    } else 
    if (data) {
     
        navigate(`/checkOptCode`, { state: { email: email } });
        setIsError(false);
      
    } else {
      if (isDataFilled) {
        setIsError(true);
      }
    }
  }, [data, error,status, navigate]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("Email");
    if (email) {
      setIsDataFilled(true);
      setNewRequestBody({
        email: email,
      });
      setEmail(email as string);
    } else {
      setIsError(true);
    }
  };

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
  const LabelTextNoAccount = styled("h1")({
    height: "12px",
    width: "fit-content",
    fontSize: "14px",
    color: "#171c26",
  });

  const ComponentContainer = styled("h1")({
    height: "fit-content",
    marginTop: "30%",
  });

  return (
    <SideContainer
      header={"هل نسيت كلمة المرور؟"}
      paragraph={
        "لاتقلق هذا يحدث احيانا, الرجاء ادخال بريدك الالكتروني في الحقل المخصص وعند تاكيده سيتم ارسال رمز اعادة تعيين كلمة المرور على بريدك الاكتروني"
      }
      imgSrc={passwordImage}
      flexDirection="row-reverse"
    >
      <div className="login-data-box signup-data-box solid">
        <ComponentContainer>
          <h1 className="page-label">اعادة تعيين كلمة المرور</h1>
          <div className="form-box solid">
            <form onSubmit={(e) => handleSubmit(e)}>
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
                type="email"
                handleChange={() => {}}
                borderRadius={10}
                value={user?.Email}
                labelColor={isError ? "#e00909" : "#171c26"}
                border={`1px solid ${isError ? "#e00909" : "#E1E8F1"}`}
              />
              {isError ? (
                <ErrorContainer>
                  <ErrorText>
                    عذراً, يبدو ان هنالك خطأ في البريد الالكتروني
                  </ErrorText>
                  <ErrorIcon src={errorIcone} />
                </ErrorContainer>
              ) : null}
              <div className="div-btn-login-form-login">
                <a href={"/"}>
                  <Button
                    className="options-button"
                    id="btn-forget-password-form"
                    backgroundColor="#00939f"
                    label="متابعة"
                    type="submit"
                    color="white"
                    height={60}
                    width={584}
                    borderRadius={10}
                    fontSize={20}
                    handleClick={() => {}}
                  ></Button>
                </a>
              </div>
            </form>
          </div>

          <div className="create-account-login-form">
            <LabelTextNoAccount>
              {"  هل تذكرت كلمة المرور؟   "}
            </LabelTextNoAccount>
            <div className="div-Forget-password">
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
                handleClick={() => {
                  navigate("/");
                }}
              ></Button>
            </div>
          </div>
        </ComponentContainer>
      </div>
    </SideContainer>
  );
}

export default ForgetPassword;
