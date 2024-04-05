import { Button, Card, Checkbox, Form, List, notification } from "antd";
import { AuthConsumer } from "../../shared/AuthContext/AuthContext";
import FormInput from "../../shared/components/FormInput/FormInput";
import { useEffect, useRef, useState } from "react";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";
import { PATH_LOGIN } from "../layout/RouteConstants";
import FormSelect from "../../shared/components/FormSelect/FormSelect";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import userpool from "../../userpool";
import ReCAPTCHA from "react-google-recaptcha";
import OTP from "./otp";
import jsonCountry from "./country.json";
import "./Login.scss";

function Signup() {
  const navigate = useNavigate();

  const recaptcha = useRef() as any;

  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!showOTP && (email?.length ?? 0) > 1) {
      navigate(PATH_LOGIN);
    }
  }, [showOTP]);

  const handleSubmit = (values: any, updateAPICreds: any) => {
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      notification.error({ message: "Please verify the reCAPTCHA!" });
      return;
    }

    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: "email",
        Value: values?.email,
      })
    );
    let username = values?.email;
    setLoading(true);
    userpool.signUp(
      username,
      values?.password,
      attributeList,
      [],
      (err, data) => {
        if (err) {
          console.log(err);
          notification.error({ message: err?.message ?? "Couldn't sign up" });
        } else {
          console.log(data);
          notification.success({ message: "User Added Successfully" });
          setEmail(values?.email);
          setShowOTP(true);
        }
        setLoading(false);
      }
    );
  };

  const passwordValidator = (_: any, value: any) => {
    // if((value?.length ?? 0) == 0) {
    //   return;
    // }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
        value
      )
    ) {
      let regxColor = "#ff4d4f";
      if ((value?.length ?? 0) > 7) {
        regxColor = "gray";
      }
      let regex1 = /[A-Z]/;
      let regx1Color = "#ff4d4f";
      if (regex1.test(value)) {
        regx1Color = "gray";
      }
      let regex2 = /[a-z]/;
      let regx2Color = "#ff4d4f";
      if (regex2.test(value ? value : "")) {
        regx2Color = "gray";
      }
      let regex3 = /[\d]/;
      let regx3Color = "#ff4d4f";
      if (regex3.test(value)) {
        regx3Color = "gray";
      }
      let regex4 = /[!@#$%^&*.?]/;
      let regx4Color = "#ff4d4f";
      if (regex4.test(value)) {
        regx4Color = "gray";
      }
      return Promise.reject(
        <>
          <span style={{ color: regxColor }}>
            Enter 8 or more characters with a mix of{" "}
          </span>
          <span style={{ color: regx1Color }}> capital letters</span>,
          <span style={{ color: regx2Color }}>small letters</span>,
          <span style={{ color: regx3Color }}>numbers </span>
          {" &"}
          <span style={{ color: regx4Color }}> symbols</span>
        </>
      );
    } else {
      return Promise.resolve();
    }
  };

  const formInputs = [
    <FormInput name={"firstname"} placeholder="First Name" isRequired />,
    <FormInput name={"lastName"} placeholder="Last Name" isRequired />,
    <FormInput
      name={"organisation_institution"}
      placeholder="Organisation/Institution"
      isRequired
    />,
    <FormSelect
      name={"country"}
      placeholder="Country"
      optionFilterProp="children"
      options={jsonCountry}
      isRequired
    />,
    <FormInput name={"phone Number"} placeholder="Phone Number" isRequired />,
    <FormInput name={"email"} type="email" placeholder="Email" isRequired />,
    <FormInput
      name={"password"}
      type="password"
      placeholder="Password"
      isRequired
      rules={[{ validator: passwordValidator }]}
    />,
    <FormInput
      name={"contirm_password"}
      type="password"
      placeholder="Confirm Password"
      isRequired
    />,
    <FormSelect
      name={"iAm"}
      label="I am a"
      options={[
        { value: "student", label: "Student" },
        { value: "seafarer", label: "Seafarer" },
        {
          value: "shore_based_professional",
          label: "Shore-based professional",
        },
        { value: "other", label: "Other" },
      ]}
    />,
  ];

  const renderSignUp = (updateAPICreds: any) => {
    return (
      <div className="login">
        <div className="signup-wrapper">
          <Card className={"login-form-wrapper"}>
            <span className="tit">{"Sign up"}</span>
            <div className="form-wrapper">
              <Form
                size="middle"
                onFinish={(e) => handleSubmit(e, updateAPICreds)}
                layout="horizontal"
                requiredMark={false}
              >
                <List
                  grid={{ gutter: 15, column: 2, md: 1, sm: 1, xs: 1 }}
                  dataSource={formInputs}
                  renderItem={(item) => (
                    <List.Item style={{ marginBottom: "0px" }}>
                      {item}
                    </List.Item>
                  )}
                />

                <Form.Item
                  name={"terms_of_use"}
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error(`Please accept terms of use`)
                            ),
                    },
                  ]}
                >
                  <Checkbox className="text-checkbox">
                    I have read the platform's privacy policy and accept its
                    terms of use.
                  </Checkbox>
                </Form.Item>

                <ReCAPTCHA
                  ref={recaptcha}
                  sitekey={"6LdCAqUpAAAAAFV1s9fjV4p8wmIkFuGM-Q8ud-mw"}
                />

                <Form.Item
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "15px",
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    size={"middle"}
                    loading={loading}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <span className="text-btn-link">
                Already a member?
                <Button type="text" onClick={() => navigate(PATH_LOGIN)}>
                  Login here!
                </Button>
              </span>
              <SocialLogin updateAPICreds={updateAPICreds} />
            </div>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <AuthConsumer>
      {({ isAuth, updateAPICreds }) => {
        return isAuth ? (
          <></>
        ) : showOTP ? (
          <OTP email={email} setShowOTP={setShowOTP} />
        ) : (
          renderSignUp(updateAPICreds)
        );
      }}
    </AuthConsumer>
  );
}

export default Signup;
