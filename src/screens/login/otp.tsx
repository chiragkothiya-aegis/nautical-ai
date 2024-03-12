import { Button, Card, Form, notification } from "antd";
import FormInput from "../../shared/components/FormInput/FormInput";
import { confirmOTP, resendOTP } from "../../shared/authenticate";
import "./Login.scss";
import { useState } from "react";

interface IEmail {
  email: string;
  setShowOTP: (value: React.SetStateAction<boolean>) => void;
}

const OTP = (props: IEmail) => {
  const { email, setShowOTP } = props;

  const [loading, setLoading] = useState(false);

  const handleResend = (values: any) => {
    resendOTP(email)
      .then(
        (data: any) => {
          notification.success({ message: "OTP send to email" });
        },
        (err) => {
          console.log(err);
          notification.error({ message: err?.message ?? "" });
        }
      )
      .catch((err) => console.log(err));
  };

  const handleSubmit = (values: any) => {
    setLoading(true);
    confirmOTP(email, values?.code)
      .then(
        (data: any) => {
          notification.success({ message: "OTP verify successfully" });
          setShowOTP(false);
        },
        (err) => {
          console.log(err);
          notification.error({ message: err?.message ?? "" });
        }
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <Card className={"login-form-wrapper"}>
          <span className="tit">Verify OTP</span>
          <div className="form-wrapper">
            <div style={{ marginBottom: "20px" }}>{`Email: ${email}`}</div>
            <Form
              size="small"
              onFinish={(e) => handleSubmit(e)}
              layout="vertical"
              requiredMark={false}
            >
              <FormInput
                name={"code"}
                type="numeric"
                placeholder="OTP"
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
                  htmlType="button"
                  size={"middle"}
                  style={{ width: "100%" }}
                  className="btn-forgotPassword"
                  onClick={(e) => handleResend(e)}
                >
                  Resend OTP?
                </Button>
                <Form.Item style={{ width: "100%" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size={"middle"}
                    style={{ width: "100%" }}
                  >
                    {"Verify"}
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

export default OTP;
