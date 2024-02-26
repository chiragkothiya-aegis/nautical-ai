import { Button, Card, Form, Input, Typography } from "antd";
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
                <Title level={2}>{"Welcome Back"}</Title>
                <div className="form-wrapper">
                  {/* <Form
                    size="middle"
                    onFinish={(e) => handleSubmit(e, updateAPICreds)}
                    layout="vertical"
                    requiredMark={false}
                    style={{ gap: "10px", display: "grid" }}
                  >
                    <FormInput
                      name={"email"}
                      type="email"
                      label="Email"
                      isBorder
                      isRequired
                    />
                    {showPassword && (
                      <FormInput
                        name={"password"}
                        type="password"
                        label="Password"
                        isBorder
                        isRequired
                      />
                    )}
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        // loading={loading}
                        size={"large"}
                        style={{ width: "100%" }}
                      >
                        {showPassword ? "Login" : "Continue"}
                      </Button>
                    </Form.Item>
                  </Form> */}
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
