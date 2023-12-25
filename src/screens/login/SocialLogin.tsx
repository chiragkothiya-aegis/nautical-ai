import { Button } from "antd";
import iconGoogle from "../../assets/images/google.svg";
import iconMicrosoft from "../../assets/images/microsoft.svg";
import iconApple from "../../assets/images/apple.svg";
import "./Login.scss";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

interface ISocialLogin {
  updateAPICreds: (authToken: any) => void;
}

const SocialLogin: React.FC<ISocialLogin> = (props: ISocialLogin) => {
  const { updateAPICreds } = props;

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("tokenResponse: ", tokenResponse);
      updateAPICreds({ payload: tokenResponse });
    },
    onError: (error) => console.log("error: ", error),
  });

  return (
    <>
      <div className="or">
        <div className="divider" />
        OR
        <div className="divider" />
      </div>
      <div className="social">
        <Button
          icon={<img src={iconGoogle} height={20} />}
          onClick={() => login()}
        >
          Continue with Google
        </Button>
        <Button icon={<img src={iconMicrosoft} height={20} />}>
          Continue with Microsoft
        </Button>
        <Button icon={<img src={iconApple} height={20} />}>
          Continue with Apple
        </Button>
      </div>
    </>
  );
};

export default SocialLogin;
