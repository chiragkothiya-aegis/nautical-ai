import { Button, Card, Form, Input, List, Typography } from "antd";
import { AuthConsumer } from "../../shared/AuthContext/AuthContext";
import FormInput from "../../shared/components/FormInput/FormInput";
import iconGoogle from "../../assets/images/google.svg";
import iconMicrosoft from "../../assets/images/microsoft.svg";
import iconApple from "../../assets/images/apple.svg";
import { useState } from "react";
import "./Login.scss";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";
import { PATH_SIGNUP } from "../layout/RouteConstants";

const { Title } = Typography;

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: any, updateAPICreds: any) => {
    if (showPassword) {
      updateAPICreds({ payload: e });
    } else {
      setShowPassword(true);
    }
  };

  return (
    <AuthConsumer>
      {({ isAuth, updateAPICreds }) => {
        return isAuth ? (
          <></>
        ) : (
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
                      >
                        Forgot Password?
                      </Button>
                      <Form.Item style={{ width: "100%" }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          // loading={loading}
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
      }}
    </AuthConsumer>
  );
}

export default Login;
