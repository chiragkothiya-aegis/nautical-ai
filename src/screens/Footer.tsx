import { Button } from "antd";
import { ReactComponent as LogoSideBlack } from "../assets/images/logo_text_side_black.svg";
import "./Header.scss";

interface IHeader {}

const Footer: React.FC<IHeader> = (props: IHeader) => {
  return (
    <div className="footer-view">
      <div className="sub-view">
        <Button type="text" className="left">Help & Support</Button>
        <Button type="text" className="left">Compliance</Button>
      </div>
      <div className="sub-view">
        <Button type="text">About NauticalAI</Button>
        <Button type="text">@ NauticalAI 2024</Button>
      </div>
      <div className="sub-view">
        <Button type="text" className="right">Terms of Use</Button>
        <Button type="text" className="right">Privacy Policy</Button>
      </div>
    </div>
  );
};

export default Footer;
