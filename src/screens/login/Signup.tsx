import { Button, Card, Checkbox, Form, List, notification } from "antd";
import { AuthConsumer } from "../../shared/AuthContext/AuthContext";
import FormInput from "../../shared/components/FormInput/FormInput";
import { useEffect, useState } from "react";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";
import { PATH_LOGIN } from "../layout/RouteConstants";
import FormSelect from "../../shared/components/FormSelect/FormSelect";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import userpool from "../../userpool";
import OTP from "./otp";
import "./Login.scss";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!showOTP && (email?.length ?? 0) > 1) {
      navigate(PATH_LOGIN);
    }
  }, [showOTP]);

  const handleSubmit = (values: any, updateAPICreds: any) => {
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

  const formInputs = [
    <FormInput name={"firstname"} placeholder="First Name" isRequired />,
    <FormInput name={"lastName"} placeholder="Last Name" isRequired />,
    <FormInput
      name={"organisation_institution"}
      placeholder="Organisation/Institution"
      isRequired
    />,
    // <FormInput name={"country"} placeholder="Country" isRequired />,
    <FormSelect
      name={"country"}
      placeholder="Country"
      options={[
        { value: "usa", label: "USA" },
        { value: "australia", label: "Australia" },
      ]}
    />,
    <FormInput name={"phone Number"} placeholder="Phone Number" isRequired />,
    <FormInput name={"email"} type="email" placeholder="Email" isRequired />,
    <FormInput
      name={"password"}
      type="password"
      placeholder="Password"
      isRequired
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
                  grid={{ gutter: 15, column: 2, xs: 1 }}
                  dataSource={formInputs}
                  renderItem={(item) => (
                    <List.Item style={{ marginBottom: "0px" }}>
                      {item}
                    </List.Item>
                  )}
                />

                <Form.Item
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

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: `Please check i am not a robot`,
                    },
                  ]}
                >
                  <Checkbox className="text-checkbox">
                    I am not a robot
                  </Checkbox>
                </Form.Item>

                <Form.Item
                  style={{ display: "flex", justifyContent: "center" }}
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
