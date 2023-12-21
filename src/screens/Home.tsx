import { Button, Divider } from "antd";
import { ReactComponent as LogoSide } from "../assets/images/logo_text_side.svg";
import { ReactComponent as LogoBlack } from "../assets/images/logo_text_black.svg";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { PATH_LOGIN } from "./layout/RouteConstants";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className="left-view-home">
        <LogoSide />
        <span className="desc">
          Display sample QnA in dynamic mode. STCW, Rules and guidances
        </span>
      </div>
      <div className="right-view-home">
        <div className="header-home">
          <Button type={"text"}>Products</Button>
          <Button type={"text"}>Company </Button>
          <Button type={"text"}>Contact</Button>
          <Button type={"text"}>About </Button>
        </div>
        <div className="view-body">
          <span className="get-start">Get started</span>
          <Button
            type={"primary"}
            onClick={() => {
              navigate(PATH_LOGIN);
            }}
          >
            Log in{" "}
          </Button>
          <Button type={"primary"}>Sign up </Button>
        </div>
        <div className="view-footer">
          <div className="logo-view">
            <LogoBlack width={"80px"} height={"80px"} />
          </div>
          <div className="view-terms">
            <Button type={"text"}>Terms of use</Button>
            <div className="divider" />
            <Button type={"text"}>Privacy policy </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
