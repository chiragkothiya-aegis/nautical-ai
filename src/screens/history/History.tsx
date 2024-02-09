import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_CHAT, PATH_HISTORY } from "../layout/RouteConstants";
import AppLoading from "../../shared/components/AppLoading/AppLoading";
import { API_SERVICE } from "../../shared/api-services";
import "./History.scss";

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
    <>
      <div className="history-view">
        <span className="title">Past Chats</span>
        {historyList?.map((item: any) => {
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
              {item?.metadata?.name}
            </Button>
          );
        })}
      </div>
      {loading && <AppLoading />}
    </>
  );
}

export default History;
