import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  List,
  Select,
  Typography,
} from "antd";
import { AuthConsumer } from "../../shared/AuthContext/AuthContext";
import FormInput from "../../shared/components/FormInput/FormInput";
import { useState } from "react";
import "./Login.scss";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";
import { PATH_LOGIN } from "../layout/RouteConstants";
import FormSelect from "../../shared/components/FormSelect/FormSelect";

const { Title, Text } = Typography;

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

  const formInputs = [
    <FormInput name={"firstname"} placeholder="First Name" isRequired />,
    <FormInput name={"lastName"} placeholder="Last Name" isRequired />,
    <FormInput
      name={"organisation_institution"}
      placeholder="organisation/Institution"
      isRequired
    />,
    <FormInput name={"country"} placeholder="Country" isRequired />,
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
      options={[{ value: "seafaser", label: "seafaser" }]}
    />,
  ];

  return (
    <AuthConsumer>
      {({ isAuth, updateAPICreds }) => {
        return isAuth ? (
          <></>
        ) : (
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
                      <Button type="primary" htmlType="submit" size={"middle"}>
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
      }}
    </AuthConsumer>
  );
}

export default Signup;
