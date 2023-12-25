import { Button, Dropdown, Layout, Space } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import profileIcon from "../../assets/images/avatar.svg";
import AppRoutes from "./AppRoutes";
import { useNavigate } from "react-router-dom";
import { PATH_CHAT, PATH_HISTORY } from "./RouteConstants";
import { useEffect, useState } from "react";
import { ReactComponent as LogoSideBlack } from "../../assets/images/logo_text_side_black.svg";
import "./AppLayout.scss";
import { googleLogout } from "@react-oauth/google";

const { Content } = Layout;

export default function AppLayout({ children }: any) {
  const Navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(PATH_CHAT);

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
      googleLogout();
      localStorage.clear();
      window.location.reload();
    }
  };

  const renderHeader = () => {
    return (
      <div className="header">
        <div className="left-view">
          <LogoSideBlack />
          <Button
            type={selectedPath == PATH_CHAT ? "primary" : "text"}
            onClick={() => handelOnClick(PATH_CHAT)}
          >
            Chat
          </Button>
          <Button
            type={selectedPath == PATH_HISTORY ? "primary" : "text"}
            onClick={() => handelOnClick(PATH_HISTORY)}
          >
            History
          </Button>
        </div>
        <div className="right-view">
          <Button
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
                src={profileIcon}
                alt={"profile"}
                width="40px"
                height="40px"
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
        <Content>
          <div style={{ paddingInline: "200px", paddingBlock: "20px" }}>
            <AppRoutes />
          </div>
        </Content>
      </>
    );
  };

  return (
    <Layout>
      <div>
        {renderHeader()}
        {renderBody()}
      </div>
    </Layout>
  );
}
