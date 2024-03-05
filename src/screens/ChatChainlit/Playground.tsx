import { v4 as uuidv4 } from "uuid";
import logo from "../../assets/images/logo.svg";
import {
  useChatInteract,
  useChatMessages,
  IStep,
  useChatData,
} from "@chainlit/react-client";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import ChatMessage from "./ChatMessage";
import { List } from "antd";
import "./ChatChainlit.scss";

interface IPlayground {}

export const Playground: React.FC<IPlayground> = (props: IPlayground) => {
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChatInteract();
  const { loading } = useChatData();
  const { messages } = useChatMessages();
  const messageListRef = useRef<any>(null);

  const [showDefaultQuestions, setShowDefaultQuestions] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
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

  const renderDefaultQuestions = () => {
    return (
      <div className="default-questions-container">
        <span className="ask-text">
          Ask <span>NauticalAI</span>
        </span>

        <div style={{ flex: 1, display: "contents" }}>
          <List
            className="question-list"
            grid={{ gutter: 0, column: 3, xs: 1 }}
            dataSource={defaultQuestions}
            renderItem={(question) => (
              <List.Item style={{ marginBottom: "0px" }}>
                <button
                  onClick={() => handleSendMessage(question)}
                  className="default-question"
                >
                  {question}
                </button>
              </List.Item>
            )}
          />
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
      <div style={{ height: "100%", display: "flex", flexDirection: "column", }}>
        {showDefaultQuestions ? (
          renderDefaultQuestions()
        ) : (
          <div className="message-list" ref={messageListRef}>
            <ChatMessage
              messages={messages}
              feedbackIds={feedbackIds}
              setFeedbackIds={setFeedbackIds}
            />
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
