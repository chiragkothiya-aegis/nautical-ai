import { Button, Dropdown, Layout, Space } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import profileIcon from "../../assets/images/avatar.svg";
import AppRoutes from "./AppRoutes";
import { useNavigate } from "react-router-dom";
import { PATH_CHAT, PATH_HISTORY } from "./RouteConstants";
import { useEffect, useState } from "react";
import { ReactComponent as IconMenu } from "../../assets/images/menu.svg";
import { ReactComponent as IconMenuDot } from "../../assets/images/menu-dot.svg";
import History from "../history/History";
import "./AppLayout.scss";

const { Content } = Layout;

export default function AppLayout({ children }: any) {
  const Navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(PATH_CHAT);
  const [showHistory, setShowHistory] = useState(true);

  const [width, setWidth] = useState<number>(window.innerWidth);

  const items = [
    // {
    //   key: "profile",
    //   label: "My Account",
    //   icon: <img src={profileIcon} height={20} />,
    // },
    {
      key: "logout",
      label: "Logout",
      icon: "",
    },
  ];

  const isMobile = width <= 768;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    const path = new URL(window.location.href).pathname;
    setSelectedPath(path);
  }, [window.location.href]);

  const handelOnClick = (path: string) => {
    Navigate(path);
  };

  const onClickDropDown = ({ key }: any) => {
    if (key === "profile") {
    } else if (key === "logout") {
      // googleLogout();
      localStorage.clear();
      window.location.reload();
    }
  };

  const renderHeader = () => {
    let user = JSON.parse(localStorage.getItem("user") ?? "{}")?.user_info;
    if((Object.keys(user ?? {})?.length ?? 0) == 0) {
      user = JSON.parse(localStorage.getItem("user") ?? "{}")
    }
    const picture = user?.picture;
    const iconPro = (picture?.length ?? 0) == 0 ? profileIcon : picture;
    return (
      <div className="header">
        <Dropdown
          menu={{
            items,
            onClick: onClickDropDown,
          }}
          placement="bottomRight"
          arrow
        >
          <Space>
            <img
              src={iconPro ?? ""}
              alt={"profile"}
              width="30px"
              height="30px"
              style={{ borderRadius: "50px" }}
            />
            {`${user?.name ?? user?.email}`}
            <IconMenuDot className="memu-dot" />
          </Space>
        </Dropdown>
      </div>
    );
  };

  const renderBody = () => {
    return (
      <>
        <div
          style={{ display: "flex", height: "100%" }}
          onClick={() => {
            if (showHistory && isMobile) {
              setShowHistory(false);
            }
          }}
        >
          <div
            style={{
              height: "100%",
              width: isMobile ? "300px" : "250px",
              display: showHistory ? "" : "none",
              position: isMobile ? "absolute" : "relative",
              zIndex: "1",
            }}
          >
            <History />
          </div>
          <div
            style={{
              paddingInline: "0px",
              paddingBlock: "0px",
              flex: "1",
              height: "100%",
              overflow: "auto",
            }}
          >
            <div
              className="menu-view"
              style={{ top: isMobile ? "5px" : "" }}
              onClick={() => setShowHistory(!showHistory)}
            >
              {isMobile ? <IconMenu /> : <div />}
            </div>
            {renderHeader()}
            <AppRoutes />
          </div>
        </div>
      </>
    );
  };

  return (
    <Layout style={{ height: "100%" }}>
      <div style={{ height: "100%", overflow: "auto" }}>
        {/* {renderHeader()} */}
        {renderBody()}
      </div>
    </Layout>
  );
}
