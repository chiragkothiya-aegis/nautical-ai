import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
import logo from "../../assets/images/logo.svg";
import {
  useChatInteract,
  useChatMessages,
  IStep,
  useChatData,
  IFeedback,
} from "@chainlit/react-client";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { LiaThumbsDownSolid, LiaThumbsUp } from "react-icons/lia";
import { apiClient } from "./ChatChainlit";
import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./ChatChainlit.scss";

const DefaultQuestion = ({ question, onClick }: any) => (
  <button onClick={() => onClick(question)} className="default-question">
    {question}
  </button>
);

interface IPlayground {
  accessToken: string;
}

export const Playground: React.FC<IPlayground> = (props: IPlayground) => {
  const { accessToken } = props;

  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChatInteract();
  const { loading } = useChatData();
  const { messages } = useChatMessages();
  const messageListRef = useRef<any>(null);
  const [showDefaultQuestions, setShowDefaultQuestions] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState(undefined as any);
  const [voteType, setVoteType] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState({} as IStep);
  const [feedbackIds, setFeedbackIds] = useState([] as any);

  const defaultQuestions = [
    "Can I use my STCW CoC to work on fishing vessels?",
    "How many hours of work and rest do I get on a ship?",
    "Can I use my mobile phone on ship?",
    "What is difference between certificate of competency or certificate of proficiency?",
    "What are the privileges of an ETO?",
  ];

  useEffect(() => {
    if (showLoading && messages?.at(-1)?.streaming) {
      setShowLoading(false);
    }
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (value: string) => {
    setShowLoading(true);
    setShowDefaultQuestions(false);
    const content = value.trim();
    if (content) {
      const message: IStep = {
        id: uuidv4(),
        name: "user",
        type: "user_message",
        output: content,
        createdAt: new Date().toISOString(),
      };
      sendMessage(message, []);
      setInputValue("");
    }
  };

  const actionFeedback = (message: IStep) => {
    const find = feedbackIds?.find(
      (item: any) => item?.messageId == message?.id
    );

    const feedback: IFeedback = {
      id: find?.feedbackId,
      comment: feedbackText,
      forId: message?.id,
      strategy: "BINARY",
      value: voteType,
    };

    apiClient
      .setFeedback(feedback, accessToken)
      .then((res) => {
        const feedback = {
          messageId: message?.id,
          feedbackId: res.feedbackId,
          type: voteType,
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

  const renderMessage = (message: IStep) => {
    const find = feedbackIds?.find(
      (item: any) => item?.messageId == message?.id
    );

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
              fill={find?.type == 1 ? "green" : ""}
              onClick={() => {
                setVoteType(find?.type == 1 ? 0 : 1);
                setSelectedMessage(message);
                setShowFeedback(true);
              }}
            />
            <LiaThumbsDownSolid
              className={"thumb-down"}
              size={20}
              fill={find?.type == -1 ? "red" : ""}
              onClick={() => {
                setVoteType(find?.type == -1 ? 0 : -1);
                setSelectedMessage(message);
                setShowFeedback(true);
              }}
            />
          </div>
        )}
      </div>
    );
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

  const renderDefaultQuestions = () => {
    return (
      <div className="default-questions-container">
        <div className={"landing-page-logo"}>
          <img src={logo} alt={"landing-page-logo"} />
        </div>
        <div className={"welcome-message"}>
          <h4>How can I help you today?</h4>
        </div>
        <div className={"default-questions-list"}>
          {defaultQuestions.map((question) => (
            <DefaultQuestion
              key={question}
              question={question}
              onClick={() => handleSendMessage(question)}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderLoader = () => {
    return (
      <div className="loading-message">
        <div className="loader" />
        <div>{"Initiating search through our extensive knowledge base..."}</div>
      </div>
    );
  };

  return (
    <div className="chat-container">
      {showFeedback && renderFeedback()}
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {showDefaultQuestions ? (
          renderDefaultQuestions()
        ) : (
          <div className="message-list" ref={messageListRef}>
            {messages.map((message) => renderMessage(message))}
            {showLoading && renderLoader()}
          </div>
        )}

        <div className="input-area">
          <input
            autoFocus
            disabled={loading || showLoading}
            type="text"
            value={inputValue}
            id="message-input"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(inputValue);
              }
            }}
            placeholder="What do you need help with?"
          />
          <AiOutlineSend
            onClick={() => handleSendMessage(inputValue)}
            className={"send-button"}
            size={40}
          />
        </div>
        <div className={"footer-message"}>
          <p>
            NauticalAI can make <strong>mistakes</strong>. Consider checking
            important information.
          </p>
        </div>
      </div>
    </div>
  );
};
