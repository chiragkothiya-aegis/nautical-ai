import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLoading from "../../shared/components/AppLoading/AppLoading";
import { API_SERVICE } from "../../shared/api-services";
import ChatMessage from "../ChatChainlit/ChatMessage";
import "../ChatChainlit/ChatChainlit.scss";

function HistoryDetail() {
  let { id } = useParams() as any;

  const [messages, setMessages] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [feedbackIds, setFeedbackIds] = useState([] as any);

  useEffect(() => {
    getThreadDetail();
  }, [id]);

  const getThreadDetail = () => {
    setLoading(true);
    API_SERVICE.threadDetail(id)
      .then(({ data }) => {
        console.log("data threadDetail: ", data);
        setMessages(data?.steps ?? []);
      })
      .catch((e) => API_SERVICE.handelAPiError(e))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="chat-container">
        <div
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <div className="message-list">
            <ChatMessage
              messages={messages}
              feedbackIds={feedbackIds}
              setFeedbackIds={setFeedbackIds}
            />
          </div>
        </div>
      </div>
      {loading && <AppLoading />}
    </>
  );
}

export default HistoryDetail;
