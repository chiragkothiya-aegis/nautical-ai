import { Button, Card, Form, notification } from "antd";
import { AuthConsumer } from "../../shared/AuthContext/AuthContext";
import FormInput from "../../shared/components/FormInput/FormInput";
import { useState } from "react";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";
import { PATH_SIGNUP } from "../layout/RouteConstants";
import { authenticate, forgotPassword } from "../../shared/authenticate";
import OTP from "./otp";
import "./Login.scss";
import ForgotPassword from "./ForgotPassword";
import { API_SERVICE } from "../../shared/api-services";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (values: any, updateAPICreds: any) => {
    setLoading(true);
    authenticate(values?.email, values?.password)
      .then(
        (data: any) => {
          console.log("login data: ", data);
          getCustomAuth(data?.idToken?.payload, updateAPICreds);
        },
        (err) => {
          console.log("err: ", err);
          console.log("err?.message: ", err?.__type);
          if (err?.message == "User is not confirmed.") {
            setEmail(values?.email);
            setShowOTP(true);
          }
          notification.error({ message: err?.message ?? "" });
          setLoading(false);
        }
      )
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getCustomAuth = (user: any, updateAPICreds: any) => {
    API_SERVICE.getCustomAuth({ username: user.email })
      .then(({ data }) => {
        if (data?.token) {
          setTimeout(() => {
            localStorage.setItem("token", data.token);
            updateAPICreds({ payload: user });
          }, 1000);
        } else {
          API_SERVICE.handelAPiError("");
        }
      })
      .catch((e) => API_SERVICE.handelAPiError(e))
      .finally(() => setLoading(false));
  };

  const renderLogin = (updateAPICreds: any) => {
    return (
      <div className="login">
        <div className="login-wrapper">
          <Card className={"login-form-wrapper"}>
            <span className="tit">Login</span>
            <div className="form-wrapper">
              <Form
                size="small"
                onFinish={(e) => handleSubmit(e, updateAPICreds)}
                layout="vertical"
                requiredMark={false}
              >
                <FormInput
                  name={"email"}
                  type="email"
                  placeholder="Email"
                  isRequired
                />
                <FormInput
                  name={"password"}
                  type="password"
                  placeholder="Password"
                  isRequired
                />

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    type="text"
                    size={"middle"}
                    style={{ width: "100%" }}
                    className="btn-forgotPassword"
                    htmlType="button"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password?
                  </Button>
                  <Form.Item style={{ width: "100%" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      size={"middle"}
                      style={{ width: "100%" }}
                    >
                      {"Login"}
                    </Button>
                  </Form.Item>
                </div>
              </Form>
              <span className="text-btn-link">
                Don't have an account?
                <Button
                  type="text"
                  onClick={() => {
                    navigate(PATH_SIGNUP);
                  }}
                >
                  Sign up
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
        ) : showForgotPassword ? (
          <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
        ) : (
          renderLogin(updateAPICreds)
        );
      }}
    </AuthConsumer>
  );
}

export default Login;
