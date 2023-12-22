import { Button } from "antd";
import iconGoogle from "../../assets/images/google.svg";
import iconMicrosoft from "../../assets/images/microsoft.svg";
import iconApple from "../../assets/images/apple.svg";
import "./Login.scss";

function SocialLogin() {
  return (
    <>
      <div className="or">
        <div className="divider" />
        OR
        <div className="divider" />
      </div>
      <div className="social">
        <Button icon={<img src={iconGoogle} height={20} />}>
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
}

export default SocialLogin;
