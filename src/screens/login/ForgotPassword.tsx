import { Button, Card, Form, notification } from "antd";
import FormInput from "../../shared/components/FormInput/FormInput";
import { confirmPassword, forgotPassword } from "../../shared/authenticate";
import { useState } from "react";
import "./Login.scss";

interface IForgotPassword {
  setShowForgotPassword: (value: React.SetStateAction<boolean>) => void;
}

const ForgotPassword = (props: IForgotPassword) => {
  const { setShowForgotPassword } = props;

  const [loading, setLoading] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (values: any) => {
    setLoading(true);
    if (showNewPass) {
      actionConfirmPassword(values);
    } else {
      actionForgotPassword(values);
    }
  };

  const actionForgotPassword = (values: any) => {
    forgotPassword(values?.email)
      .then(
        (data: any) => {
          setEmail(values?.email);
          setShowNewPass(true);
        },
        (err) => {
          console.log("err: ", err);
          notification.error({ message: err?.message ?? "" });
        }
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const actionConfirmPassword = (values: any) => {
    confirmPassword(email, values?.code, values?.password)
      .then(
        (data: any) => {
          notification.success({ message: "Password set successfully" });
          setShowForgotPassword(false);
        },
        (err) => {
          console.log("err: ", err);
          notification.error({ message: err?.message ?? "" });
        }
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const renderEmail = () => {
    return (
      <FormInput name={"email"} type="email" placeholder="Email" isRequired />
    );
  };

  const renderNewPass = () => {
    return (
      <>
        <div style={{ marginBottom: "20px" }}>{`Email: ${email}`}</div>
        <FormInput name={"code"} type="numeric" placeholder="OTP" isRequired />
        <FormInput
          name={"password"}
          type="password"
          placeholder="Password"
          isRequired
        />
        <FormInput
          name={"contirm_password"}
          type="password"
          placeholder="Confirm Password"
          isRequired
        />
      </>
    );
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <Card className={"login-form-wrapper"}>
          <span className="tit">Forgot Password</span>
          <div className="form-wrapper">
            <Form
              size="small"
              onFinish={(e) => handleSubmit(e)}
              layout="vertical"
              requiredMark={false}
            >
              {showNewPass ? renderNewPass() : renderEmail()}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <Button
                  type="text"
                  htmlType="button"
                  size={"middle"}
                  style={{ width: "100%" }}
                  className="btn-forgotPassword"
                  onClick={(e) => setShowForgotPassword(false)}
                >
                  Back to login
                </Button>
                <Form.Item style={{ width: "100%" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size={"middle"}
                    style={{ width: "100%" }}
                  >
                    {"Submit"}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
