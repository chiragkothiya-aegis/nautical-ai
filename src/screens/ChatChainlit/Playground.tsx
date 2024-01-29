import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
import logo from "../../assets/images/logo.svg";
import {
  useChatInteract,
  useChatMessages,
  IStep,
} from "@chainlit/react-client";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import "./ChatChainlit.scss";
import { LiaThumbsDownSolid, LiaThumbsUp } from "react-icons/lia";

const DefaultQuestion = ({ question, onClick }: any) => (
  <button onClick={() => onClick(question)} className="default-question">
    {question}
  </button>
);

export function Playground() {
  const [inputValue, setInputValue] = useState("");
  const { sendMessage, callAction } = useChatInteract();
  const { messages } = useChatMessages();
  const messageListRef = useRef<any>(null);
  const [showDefaultQuestions, setShowDefaultQuestions] = useState(true);

  const defaultQuestions = [
    "Can I use my STCW CoC to work on fishing vessels?",
    "How many hours of work and rest do I get on a ship?",
    "Can I use my mobile phone on ship?",
    "What is difference between certificate of competency or certificate of proficiency?",
    "What are the privileges of an ETO?",
  ];

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (value: string) => {
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

  const renderMessage = (message: IStep) => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(message.createdAt).toLocaleTimeString(
      undefined,
      dateOptions
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
        {/* {message.type == "assistant_message" && (
          <div className={"feedback-button"}>
            <LiaThumbsUp className={"thumb-up"} size={20} />
            <LiaThumbsDownSolid className={"thumb-down"} size={20} />
          </div>
        )} */}
        {/* <div className={"feedback-button"}>
          <small className="text-xs text-gray-500">{date}</small>
        </div> */}
      </div>
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

  return (
    <div className="chat-container">
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {showDefaultQuestions ? (
          renderDefaultQuestions()
        ) : (
          <div className="message-list" ref={messageListRef}>
            {messages.map((message) => renderMessage(message))}
          </div>
        )}

        <div className="input-area">
          <input
            autoFocus
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
}
