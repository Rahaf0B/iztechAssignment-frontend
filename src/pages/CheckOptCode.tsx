import React, { useContext, useEffect } from "react";
import Button from "../component/Button";
import TextField from "../component/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import SideContainer from "../component/SideContainer";
import passwordImage from "../utlis/assets/forget password 2.png";
import styled from "styled-components";
import reloadIcon from "../utlis/assets/reboot.png";
import errorIcone from "../utlis/assets/Icon _ Alert.svg";
import { usePut } from "../CustomHook/APIHook";

function CheckOptCode() {
  const navigate = useNavigate();
  const [isDataFilled, setIsDataFilled] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const { data, error, status, setNewRequestBody } = usePut(
    "http://localhost:8080/auth/validate-opt-code"
  );

  const {
    data: optData,
    error: errorOpt,
    status: statusOpt,
    setNewRequestBody: setSendOptCode,
  } = usePut("http://localhost:8080/auth/send-opt-code");

  const { state } = useLocation();
  let emailValue = "";
  if (state) {
    const { email } = state;
    emailValue = email;
  }

  useEffect(() => {
    if (
      status == 400 ||
      status == 404 ||
      statusOpt == 400 ||
      statusOpt == 404
    ) {
      setIsError(true);
    } else if (data) {
      navigate("/checkOptCode");
      setIsError(false);
    } else {
      if (isDataFilled) {
        setIsError(true);
      }
    }
  }, [data, error, navigate, status, optData, errorOpt, statusOpt]);

  const handleResendCode = () => {
    setSendOptCode({
      email: emailValue,
    });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let optCode = "";
    for (let i = 0; i < 6; i++) {
      optCode = optCode + data.get("optCode" + (i + 1));
    }
    if (emailValue) {
      setIsDataFilled(true);
      setNewRequestBody({
        email: emailValue,
        opt_code: optCode,
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

  const OPTFieldContainer = styled("div")({
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    marginBottom: "40px",
    justifyContent: "space-between",
  });

  const SpanLabelHeading = styled("span")({
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.25,
    letterSpacing: "-0.15px",
    textAlign: "left",
    color: "#718096",
  });
  const EmailSpanLabelHeading = styled("span")({
    color: "#171923",
    fontWeight: "bolder",
    marginLRight: "5px",
  });

  const ReloadContainer = styled("div")({
    width: "147px",
    height: "32px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "40px",

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    padding: "0 16px",
    borderRadius: "4px",
  });
  const ReloadText = styled("h1")({
    fontSize: "16px",
    fontWeight: "500",
    color: "#00939f",
  });

  const ReloadIconImage = styled("img")({
    width: "16px",
    height: "16px",
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

  return (
    <SideContainer
      header={"التحقق من الرمز!  "}
      paragraph={
        "لقد تم ارسال رمز على بريدك الالكتروني الرجاء كتابته في الحقول المخصصة لبدء استرجاع كلمة المرور"
      }
      imgSrc={passwordImage}
      flexDirection="row-reverse"
    >
      <div className="login-data-box signup-data-box solid">
        <ComponentContainer>
          <h1 className="page-label">التحقق من الرمز</h1>
          <div className="form-box solid">
            <form onSubmit={(e) => handleSubmit(e)}>
              <SpanLabelHeading>
                <EmailSpanLabelHeading>
                  {"example@gmail.com"}
                </EmailSpanLabelHeading>
                قم بادخال الرمز المرسلة الى بريدك الالكتروني
              </SpanLabelHeading>
              <OPTFieldContainer>
                {(() => {
                  const listItems = [];
                  for (let i = 0; i < 6; i++) {
                    listItems.push(
                      <TextField
                        id={"opt" + (i + 1)}
                        name={"optCode" + (i + 1)}
                        className="TextField-opt"
                        labelClassName="label-opt"
                        width={89}
                        height={54}
                        size="sm"
                        handleChange={() => {}}
                        borderRadius={10}
                        value={""}
                        border="1px solid #E1E8F1"
                        textAlign="center"
                      />
                    );
                  }
                  return listItems;
                })()}
              </OPTFieldContainer>
              {isError ? (
                <ErrorContainer>
                  <ErrorText>عذراً, يبدو ان هنالك خطأ في الرمز</ErrorText>
                  <ErrorIcon src={errorIcone} />
                </ErrorContainer>
              ) : null}
              <ReloadContainer>
                <ReloadText>اعادة الارسال</ReloadText>
                <ReloadIconImage src={reloadIcon} onClick={handleResendCode} />
              </ReloadContainer>
              <div className="div-btn-login-form-login">
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
                  handleClick={() => {}}
                ></Button>
              </div>
            </form>
          </div>

          <div className="create-account-login-form">
            <LabelTextNoAccount>
              {"  هل تذكرت كلمة المرور؟   "}
            </LabelTextNoAccount>
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
                  handleClick={() => {
                    navigate("/");
                  }}
                ></Button>
              </a>
            </div>
          </div>
        </ComponentContainer>
      </div>
    </SideContainer>
  );
}

export default CheckOptCode;
