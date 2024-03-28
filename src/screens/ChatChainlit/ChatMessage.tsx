import { useState } from "react";
import { IFeedback, IStep } from "@chainlit/react-client";
import ReactMarkdown from "react-markdown";
import logo from "../../assets/images/logo-ai.png";
import { LiaThumbsDownSolid, LiaThumbsUp } from "react-icons/lia";
import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { apiClient } from "../../shared/api-services";

interface IChatMessage {
  messages: IStep[];
  feedbackIds: any;
  setFeedbackIds: React.Dispatch<any>;
}

const ChatMessage: React.FunctionComponent<IChatMessage> = (
  props: IChatMessage
) => {
  const { messages, feedbackIds, setFeedbackIds } = props;
  const [showFeedback, setShowFeedback] = useState(false);
  const [voteType, setVoteType] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState({} as IStep);
  const [feedbackText, setFeedbackText] = useState(undefined as any);

  const actionFeedback = (message: IStep) => {
    const findFeedback = feedbackIds?.find(
      (item: any) => item?.messageId == message?.id
    );

    const feedback: IFeedback = {
      id: message?.feedback?.id ?? findFeedback?.id,
      comment: feedbackText,
      forId: message?.id,
      strategy: "BINARY",
      value: voteType,
    };

    apiClient
      .setFeedback(feedback, localStorage.getItem("token") ?? "")
      .then((res) => {
        const feedback = {
          messageId: message?.id,
          id: res.feedbackId,
          value: voteType,
        };
        const tmp = [...feedbackIds];
        let index = tmp.findIndex((item) => item?.messageId == message?.id);
        if (index !== -1) {
          tmp[index] = feedback;
        } else {
          tmp.push(feedback);
        }
        setFeedbackIds(tmp);
      })
      .catch((e) => {
        console.log("E: ", e);
      });
  };

  const renderFeedback = () => {
    return (
      <Modal
        centered
        width={350}
        open={showFeedback}
        closable={false}
        okText="Submit"
        onOk={() => {
          actionFeedback(selectedMessage);
          setShowFeedback(false);
        }}
        onCancel={() => setShowFeedback(false)}
      >
        <div style={{ display: "grid", gap: "20px", paddingBottom: "10px" }}>
          <span>Provide additional feedback</span>
          <TextArea
            name="feedback"
            bordered
            style={{ border: "1px solid lightgray" }}
            onChange={(e) => {
              setFeedbackText(e.target.value);
            }}
          />
        </div>
      </Modal>
    );
  };

  const renderMessage = (message: IStep) => {
    const findFeedback = feedbackIds?.find(
      (item: any) => item?.messageId == message?.id
    );

    const feedbackValue = findFeedback?.value ?? message?.feedback?.value;

    return (
      <div key={message.id} className={`message`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <img src={logo} alt="Bot" className="bot-icon" />
          <div>{message.type == "user_message" ? "You" : "Nautical Bot"}</div>
        </div>
        <p>
          <ReactMarkdown>{message.output}</ReactMarkdown>
        </p>
        {message.type == "assistant_message" && (
          <div className={"feedback-button"}>
            <LiaThumbsUp
              className={"thumb-up"}
              size={20}
              fill={feedbackValue == 1 ? "green" : ""}
              onClick={() => {
                setVoteType(feedbackValue == 1 ? 0 : 1);
                setSelectedMessage(message);
                setShowFeedback(true);
              }}
            />
            <LiaThumbsDownSolid
              className={"thumb-down"}
              size={20}
              fill={feedbackValue == -1 ? "red" : ""}
              onClick={() => {
                setVoteType(feedbackValue == -1 ? 0 : -1);
                setSelectedMessage(message);
                setShowFeedback(true);
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {showFeedback && renderFeedback()}
      {messages.map((message) => renderMessage(message))}
    </>
  );
};

export default ChatMessage;
