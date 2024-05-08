import React, { useContext } from "react";
import Button from "../component/Button";
import TextField from "../component/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import SideContainer from "../component/SideContainer";
import passwordImage from "../utlis/assets/forget password 3.png";
import styled, { css } from "styled-components";
import person from "../utlis/assets/iconwrappeh.svg";
import { usePatch } from "../CustomHoook/APIHook";

function ChangePassword() {
  const navigate = useNavigate();
  const [isDataFilled, setIsDataFilled] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const { data, error, setNewRequestBody } = usePatch(
    "http://localhost:8080/auth/validate-opt-code"
  );
  const { state } = useLocation();
  let emailValue = "";
  if (state) {
    const { email } = state;
    emailValue = email;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const password = data.get("password");

    if (emailValue) {
      setIsDataFilled(true);
      setNewRequestBody({
        email: emailValue,
        password: password,
      });
      navigate(`/changePassword`, { state: { email: emailValue } });
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
    marginTop: "30%",
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
    marginBottom: "40px",
  });

  return (
    <SideContainer
      header={"انت تبلي حسناً"}
      paragraph={
        "يمكنك الان اعادة تعيين كلمة المرور واداخال كلمة مرور جديدة والبدء في انجاز مهماتك..."
      }
      imgSrc={passwordImage}
      flexDirection="row"
    >
      <div className="login-data-box signup-data-box solid">
        <ComponentContainer>
          <h1 className="page-label">تعيين كلمة المرور الجديدة</h1>
          <div className="form-box solid">
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextField
                id="password"
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
                border="1px solid #E1E8F1"
              />

              <PasswordLabelContainer>
                <PasswordLabelDescription>
                  يجب ان تتكون كلمة المرور على 8 رموز على الاقل
                </PasswordLabelDescription>
                <PasswordLabelDescription>
                  يجب ان تحتوي كلمة المرور على رموز وأرقام
                </PasswordLabelDescription>
              </PasswordLabelContainer>

              <div className="div-btn-login-form-login">
                <a href={"/"}>
                  <Button
                    className="options-button"
                    id="btn-forget-password-form"
                    backgroundColor="#00939f"
                    label="اعادة تعيين كلمة المرور"
                    type="submit"
                    color="white"
                    height={60}
                    width={584}
                    borderRadius={10}
                    fontSize={20}
                    handleClick={() => navigate("/")}
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
                handleClick={() => navigate("/")}
              ></Button>
            </div>
          </div>
        </ComponentContainer>
      </div>
    </SideContainer>
  );
}

export default ChangePassword;
