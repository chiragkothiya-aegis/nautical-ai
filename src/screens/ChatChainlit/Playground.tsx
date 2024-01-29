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

export function Playground() {
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChatInteract();
  const { messages } = useChatMessages();
  const messageListRef = useRef<any>(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    const content = inputValue.trim();
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
        <div className={"feedback-button"}>
          <small className="text-xs text-gray-500">{date}</small>
        </div>
      </div>
    );
  };

  return (
    <div className="chat-container">
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div className="message-list" ref={messageListRef}>
          {messages.map((message) => renderMessage(message))}
        </div>

        <div className="input-area">
          <input
            autoFocus
            type="text"
            value={inputValue}
            id="message-input"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="What do you need help with?"
          />
          <AiOutlineSend
            onClick={handleSendMessage}
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
