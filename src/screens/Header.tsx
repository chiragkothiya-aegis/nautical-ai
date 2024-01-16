import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoSideBlack } from "../assets/images/logo_text_side_black.svg";
import {
  PATH_ABOUT,
  PATH_COMPANY,
  PATH_CONTACT,
  PATH_PRODUCTS,
} from "./layout/RouteConstants";
import "./Header.scss";

interface IHeader {}

const Header: React.FC<IHeader> = (props: IHeader) => {
  const navigate = useNavigate();

  return (
    <div className="header-view">
      <LogoSideBlack height={"25px"} width={"200px"} onClick={() => navigate("/")} />
      <div className="buttons">
        <Button type={"text"} onClick={() => navigate(PATH_PRODUCTS)}>
          Products
        </Button>
        <Button type={"text"} onClick={() => navigate(PATH_COMPANY)}>
          Company
        </Button>
        <Button type={"text"} onClick={() => navigate(PATH_CONTACT)}>
          Contact
        </Button>
        <Button type={"text"} onClick={() => navigate(PATH_ABOUT)}>
          About
        </Button>
      </div>
    </div>
  );
};

export default Header;
