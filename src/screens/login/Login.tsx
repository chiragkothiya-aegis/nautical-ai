import { Button, Card, Form, Input, Typography } from "antd";
import { AuthConsumer } from "../../shared/AuthContext/AuthContext";
import "./Login.scss";

const { Title } = Typography;

function Login() {
  const handleSubmit = (e: any, updateAPICreds: any) => {
    updateAPICreds({payload: e});
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
                <Title level={2}>{"Sign In"}</Title>
                <div className="form-wrapper">
                  <Form
                    size="middle"
                    onFinish={(e) => handleSubmit(e, updateAPICreds)}
                    layout="vertical"
                    requiredMark={false}
                  >
                    <Form.Item
                      label={"Mobile No."}
                      name="mobileNumber"
                      rules={[
                        { required: true, message: "Mobile no is required" },
                        // {
                        //     pattern: PHONE_NUMBER_REGEX,
                        //     message: "Please enter valid number",
                        // }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={"Password"}
                      name="password"
                      rules={[
                        { required: true, message: "Password is required" },
                      ]}
                    >
                      <Input.Password type="password" />
                    </Form.Item>
                    <br />
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        // loading={loading}
                        size={"large"}
                        className="full-width"
                      >
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
                {/* <Row justify={"space-around"}>
            <Col>
              <Link to="/forgot-password">{t("genDict.forgotPassword")}</Link>
            </Col>
          </Row> */}
              </Card>
            </div>
          </div>
        );
      }}
    </AuthConsumer>
  );
}

export default Login;
