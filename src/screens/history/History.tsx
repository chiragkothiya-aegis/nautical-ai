import { Button, Collapse, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_CHAT, PATH_HISTORY } from "../layout/RouteConstants";
import AppLoading from "../../shared/components/AppLoading/AppLoading";
import { API_SERVICE } from "../../shared/api-services";
import iconSearch from "../../assets/images/search.svg";
import iconMessage from "../../assets/images/message.png";
import logo from "../../assets/images/logo.png";
import "./History.scss";

const { Panel } = Collapse;

function History() {
  const navigate = useNavigate();

  const [historyList, setHistoryList] = useState([] as any);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var body = {
      pagination: {
        first: 20,
      },
      filter: {},
    };

    setLoading(true);
    API_SERVICE.threads(body)
      .then(({ data }) => {
        setHistoryList(data?.data ?? []);
      })
      .catch((e) => API_SERVICE.handelAPiError(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div className="history-view">
        <div
          style={{
            display: "grid",
            justifyContent: "center",
            gap: "30px",
            marginBlock: "20px",
          }}
        >
          <img src={logo} width={"150px"} />
          <Button>Discuss</Button>
        </div>
        {/* <Input
          size="large"
          className="search-input"
          prefix={<img src={iconSearch} alt="" />}
          placeholder="Search"
          allowClear
        /> */}

        {(historyList?.length ?? 0) == 0 ? (
          <div className="empty-view">Empty...</div>
        ) : (
          <span className="recent">Recent</span>
        )}
        {historyList?.slice(0, 5)?.map((item: any) => {
          return (
            <Button
              type="text"
              style={{ textAlign: "left" }}
              onClick={() => {
                navigate(PATH_HISTORY + `/${item?.id}`, {
                  state: { question: item?.question },
                });
              }}
            >
              <img src={iconMessage} />
              {`item?.name ${item}`}
            </Button>
          );
        })}

        {(historyList?.length ?? 0) > 5 && (
          <Collapse className="view-all-collapse">
            <Panel header={"View All"} key={"1"}>
              {historyList?.slice(5)?.map((item: any) => {
                return (
                  <Button
                    type="text"
                    style={{ textAlign: "left", width: "100%" }}
                    onClick={() => {
                      navigate(PATH_HISTORY + `/${item?.id}`, {
                        state: { question: item?.question },
                      });
                    }}
                  >
                    <img src={iconMessage} />
                    {`item?.name ${item}`}
                  </Button>
                );
              })}
            </Panel>
          </Collapse>
        )}
      </div>
      {loading && <AppLoading />}
    </div>
  );
}

export default History;
