import { Button, Card, Form, Input, Typography } from "antd";
import { AuthConsumer } from "../../shared/AuthContext/AuthContext";
import FormInput from "../../shared/components/FormInput/FormInput";
import { useState } from "react";
import "./Login.scss";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";
import { PATH_LOGIN } from "../layout/RouteConstants";

const { Title } = Typography;

function Signup() {
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
                <Title level={2}>{"Create your account"}</Title>
                <div className="form-wrapper">
                  <Form
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
                  </Form>
                  <span className="text-btn-link">
                    Already have an account?
                    <Button
                      type="text"
                      onClick={() => {
                        navigate(PATH_LOGIN);
                      }}
                    >
                      Log in
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

export default Signup;
