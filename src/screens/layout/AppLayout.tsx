import { Button, Dropdown, Layout, Space } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import profileIcon from "../../assets/images/avatar.svg";
import AppRoutes from "./AppRoutes";
import { useNavigate } from "react-router-dom";
import { PATH_CHAT, PATH_HISTORY } from "./RouteConstants";
import { useEffect, useState } from "react";
import { ReactComponent as LogoSideBlack } from "../../assets/images/logo_text_side_black.svg";
import History from "../history/History";
import "./AppLayout.scss";

const { Content } = Layout;

export default function AppLayout({ children }: any) {
  const Navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(PATH_CHAT);
  const [showHistory, setShowHistory] = useState(true);

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
    const picture = JSON.parse(localStorage.getItem("user") ?? "{}")?.user_info?.picture;
    const iconPro = (picture?.length ?? 0) == 0 ?  profileIcon : picture;
    return (
      <div className="header">
        <div className="left-view">
          <LogoSideBlack height={30} width={140} />
          <div>
            <Button
              size="small"
              type={selectedPath == PATH_CHAT ? "primary" : "text"}
              onClick={() => handelOnClick(PATH_CHAT)}
            >
              Chat
            </Button>
          </div>
        </div>
        <div className="right-view">
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={() => {
              Navigate(PATH_CHAT);
              window?.location?.reload();
            }}
          >
            New Chat
          </Button>
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
                style={{borderRadius:'50px'}}
              />
              <DownOutlined
                style={{
                  marginRight: "5px",
                  marginBottom: "4px",
                }}
              />
            </Space>
          </Dropdown>
        </div>
      </div>
    );
  };

  const renderBody = () => {
    return (
      <>
        <Content style={{ display: "flex" }}>
          <div style={{ width: "250px", display: showHistory ? "" : "none" }}>
            <History />
          </div>
          <div style={{ paddingInline: "0px", paddingBlock: "0px", flex: "1" }}>
            <div
              className="menu-view"
              onClick={() => setShowHistory(!showHistory)}
            >
              <div />
            </div>
            <AppRoutes />
          </div>
        </Content>
      </>
    );
  };

  return (
    <Layout>
      <div style={{ height: "100vh", overflow: "hidden" }}>
        {renderHeader()}
        {renderBody()}
      </div>
    </Layout>
  );
}
