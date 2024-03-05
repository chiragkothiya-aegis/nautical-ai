import { Button, Divider } from "antd";
import { ReactComponent as LogoSide } from "../assets/images/logo_text_side.svg";
import { ReactComponent as LogoBlack } from "../assets/images/logo_text_black.svg";
import { ReactComponent as LogoText } from "../assets/images/logo_text.svg";
import docking from "../assets/images/docking.png";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import logo from "../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PATH_ABOUT,
  PATH_COMPANY,
  PATH_CONTACT,
  PATH_LOGIN,
  PATH_PRODUCTS,
  PATH_SIGNUP,
} from "./layout/RouteConstants";
import WriteLikeChatGPT from "../shared/components/WriteLikeChatGPT";
import { useEffect, useState } from "react";
import Signup from "./login/Signup";
import Login from "./login/Login";
import "./Home.scss";

function Home() {
  const navigate = useNavigate();

  const [imageSecondPage, setImageSecondPage] = useState(image1);

  const questions = [
    {
      question: "Can I use my STCW CoC to work on fishing vessels?",
      answer:
        "Based on the provided documents, it is clear that the STCW Convention 1978, as amended, contains provisions specifically for the certification and training of personnel on fishing vessels. The International Convention on Standards of Training, Certification and Watchkeeping for Fishing Vessel Personnel (STCW-F), 1995, addresses the specific requirements for personnel working on fishing vessels",
    },
    {
      question: "I hold an MEC3 CoC. Can I obtain an ETO CoC?",
      answer:
        "Based on the provided documents, it is possible for an individual holding a Marine Engineer Class 3 (MEC 3) Certificate of Competency (CoC) to obtain an Electro-Technical Officer (ETO) CoC. The process for obtaining an ETO CoC involves meeting specific requirements outlined in the Maritime Rules Part 32.118 and the Marine Engineer Class 3 (MEC 3) guidelines.",
    },
    {
      question: "How many hours of work and rest do I get on a ship?",
      answer:
        "The hours of work and rest for seafarers on a ship are governed by various regulations and guidelines to ensure the safety, well-being, and operational efficiency of the crew. The specific requirements are outlined in the Maritime Rules Part 31, the Marine Orders 74 and 71, the MLC 2006, and the STCW Convention.",
    },
    {
      question:
        "What topics are covered in the final oral exam for the MEC 3 certificate?",
      answer:
        "The final oral exam for the Marine Engineer Class 3 (MEC 3) certificate covers a range of topics to assess the candidate's competency in accordance with the STCW Convention and Maritime Rules Part 32.120. The examination is designed to ensure that the candidate has acquired the necessary knowledge and skills to perform engineering duties on maritime vessels at the operational level.",
    },
  ];

  const [question, setQuestion] = useState(questions[0]);

  const images = [image1, image2, image3];

  const { pathname } = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * images.length);
      setImageSecondPage(images[random]);

      const randomQ = Math.floor(Math.random() * questions.length);
      setQuestion(questions[randomQ]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderTop = () => {
    return (
      <div className="home-main-view">
        <div className="left-view-home">
          {/* <LogoSide /> */}
          <img src={logo} width={"150px"} />
          <div style={{ marginTop: "10px", paddingBlock: "20px" }}>
            <span className="desc">{question.question}</span>
            {/* <WriteLikeChatGPT text={question.answer} /> */}
          </div>
        </div>
        <div className="right-view-home">
          {pathname == PATH_SIGNUP ? <Signup /> : <Login />}
          {/* <div className="header-home">
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
          </div> */}
        </div>
      </div>
    );
  };

  const renderSecond = () => {
    return (
      <div className="home-main-view">
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
          <img src={imageSecondPage} />
        </div>
      </div>
    );
  };

  const renderThird = () => {
    return (
      <div className="home-main-view">
        <div className="left-view-home-third">
          <img src={docking} />
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
      {/* {renderSecond()}
      {renderThird()}
      {renderFooter()} */}
    </>
  );
}

export default Home;
