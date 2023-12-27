import { Button, Divider } from "antd";
import { ReactComponent as LogoSide } from "../assets/images/logo_text_side.svg";
import { ReactComponent as LogoBlack } from "../assets/images/logo_text_black.svg";
import { ReactComponent as LogoText } from "../assets/images/logo_text.svg";
import docking from "../assets/images/docking.png";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import { useNavigate } from "react-router-dom";
import { PATH_LOGIN, PATH_SIGNUP } from "./layout/RouteConstants";
import WriteLikeChatGPT from "../shared/components/WriteLikeChatGPT";
import { useEffect, useState } from "react";
import "./Home.scss";

function Home() {
  const navigate = useNavigate();

  const [imageSecondPage, setImageSecondPage] = useState(image1);

  const images = [image1, image2, image3];

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * images.length);
      setImageSecondPage(images[random]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderTop = () => {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <div className="left-view-home">
          <LogoSide />
          <div>
            <span className="desc">
              Can I use my STCW CoC to work on fishing vessels?
            </span>
            <WriteLikeChatGPT text="Based on the provided documents, it is clear that the STCW Convention 1978, as amended, contains provisions specifically for the certification and training of personnel on fishing vessels. The International Convention on Standards of Training, Certification and Watchkeeping for Fishing Vessel Personnel (STCW-F), 1995, addresses the specific requirements for personnel working on fishing vessels" />
          </div>
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
            <Button
              type={"primary"}
              onClick={() => {
                navigate(PATH_SIGNUP);
              }}
            >
              Sign up{" "}
            </Button>
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
  };

  const renderSecond = () => {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <div className="left-view-home-second">
          {/* <div> */}
          <span className="desc">
            Get instant advise on STCW, MARPOL, IMDG with references to IMO
            conventions and codes
          </span>
          <Button className="btn-get-start" type={"primary"} onClick={() => {}}>
            Get started
          </Button>
          {/* </div> */}
        </div>
        <div className="right-view-home-second">
          <img src={imageSecondPage} style={{ height: "80vh" }} />
        </div>
      </div>
    );
  };

  const renderThird = () => {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <div className="left-view-home-third">
          <img src={docking} style={{ height: "90vh" }} />
        </div>

        <div className="right-view-home-third">
          {/* <div> */}
          <span className="desc">
            Want to start your seafarer career but dont know where to start?
          </span>
          <span style={{ color: "gray" }}>
            nauticalAI has all the answers to STCW related questions
          </span>
          <Button className="btn-find" type={"primary"} onClick={() => {}}>
            Find out more
          </Button>
          {/* </div> */}
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className="home-footer-view">
        <LogoText width={"40vh"} height={"40vh"} />
      </div>
    );
  };

  return (
    <>
      {renderTop()}
      {renderSecond()}
      {renderThird()}
      {renderFooter()}
    </>
  );
}

export default Home;
