import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import logo from "../../assets/images/logo.svg"
import "./ChatInterface.css";
// import NavBar from "./NavBar";
import { AiOutlineSend } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { GiRobotAntennas } from "react-icons/gi";
import { LiaThumbsUp } from "react-icons/lia";
import { LiaThumbsDownSolid } from "react-icons/lia";

const DefaultQuestion = ({ question, onClick }: any) => (
  <button onClick={() => onClick(question)} className="default-question">
    {question}
  </button>
);

function safeStringify(
  obj: any,
  replacer: any = null,
  spaces = 2,
  cycleReplacer: any = null
) {
  const seen = new WeakSet();
  return JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return cycleReplacer ? cycleReplacer(key, value) : "[Circular]";
        }
        seen.add(value);
      }
      return replacer ? replacer(key, value) : value;
    },
    spaces
  );
}

function ChatInterface() {
  const [messages, setMessages] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showDefaultQuestions, setShowDefaultQuestions] = useState(true);

  const endOfMessagesRef = useRef(null);
  const messageListRef = useRef<any>(null);
  const defaultQuestions = [
    "Can I use my STCW CoC to work on fishing vessels?",
    "How many hours of work and rest do I get on a ship?",
    "I hold an MEC3 CoC. Can I obtain an ETO CoC?",
    "What are the acceptable forms of primary ID and other forms of ID for an MEC 3?",
    "What topics are covered in the final oral exam for the MEC 3 certificate?",
  ];

  const loadingMessages = [
    "1/6 Searching across knowledge base",
    "2/6 Analysing extracted result",
    "3/6 Scanning for information in STCW code",
    "4/6 Looking for Table references",
    "5/6 Analysing all datasets",
    "6/6 Generating result",
    "Almost Finished Generating Result",
  ];

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    let intervalId: any;
    if (isLoading) {
      let messageIndex = 0;
      setLoadingMessage("1/6 Searching across knowledge base");
      intervalId = setInterval(() => {
        messageIndex = (messageIndex + 1) % 7;
        setLoadingMessage(loadingMessages[messageIndex]);
      }, 4000);
    } else {
      setLoadingMessage("");
    }
    return () => clearInterval(intervalId);
  }, [isLoading]);

  const streamMessage = (
    text: any,
    sender: any,
    markdown: any,
    references = []
  ) => {
    let i = 0;
    const streamId = Date.now();
    const intervalId = setInterval(() => {
      if (i <= text.length) {
        const nextText = text.slice(0, i);
        setMessages((messages: any) => {
          let filteredMessages = messages.filter(
            (m: any) => !(m.sender === sender && m.streaming)
          );
          return [
            ...filteredMessages,
            {
              id: streamId,
              text: nextText,
              sender,
              markdown,
              streaming: true,
              references,
            },
          ];
        });
        i++;
      } else {
        setMessages((messages: any) => {
          let filteredMessages = messages.filter(
            (m: any) => !(m.sender === sender && m.streaming)
          );
          return [
            ...filteredMessages,
            {
              id: streamId,
              text,
              sender,
              markdown,
              streaming: false,
              references,
            },
          ];
        });
        clearInterval(intervalId);
      }
    }, 1);
  };

  const handleSend = async (input = inputValue.trim()) => {
    if (input !== "") {
      setShowDefaultQuestions(false);
      streamMessage(input, "user", false);
      setInputValue("");
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://agent-backend-fxhbdhovha-el.a.run.app/process_query",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: input }),
          }
        );

        const data = await response.json();
        setIsLoading(false);

        if (data.error) {
          streamMessage(data.error, "system", false);
        } else {
          streamMessage(data.content, "system", true, data.references);
        }
      } catch (error) {
        setIsLoading(false);
        streamMessage("Error connecting to the server.", "system", false);
      }
    }
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSendButton = (event: any) => {
    handleSend(inputValue);
  };

  const handleDefaultQuestionClick = (question: any) => {
    handleSend(question);
  };

  const renderMessageText = (message: any) => {
    if (message.markdown) {
      return <ReactMarkdown>{message.text}</ReactMarkdown>;
    } else {
      if (typeof message.text === "object") {
        return <span>{safeStringify(message.text)}</span>;
      } else {
        return <span>{message.text}</span>;
      }
    }
  };

  return (
    <div className="chat-container">
      {/* <NavBar /> */}
      {/*<Sidebar />*/}
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div className="message-list" ref={messageListRef}>
          {messages.map((message: any) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.sender === "system" && (
                <img src={logo} alt="Bot" className="bot-icon" />
              )}
              {message.sender === "user" && (
                <GiRobotAntennas className="user-icon" size={18} />
              )}
              {renderMessageText(message)}
              {message.markdown && (
                <div className={"feedback-button"}>
                  <LiaThumbsUp className={"thumb-up"} size={20} />
                  <LiaThumbsDownSolid className={"thumb-down"} size={20} />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="loading-message">
              <div className="loader"></div>
              <div>{loadingMessage}</div>
            </div>
          )}
        </div>

        {showDefaultQuestions && (
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
                  onClick={handleDefaultQuestionClick}
                />
              ))}
            </div>
          </div>
        )}
        <div className="input-area">
          <CiCirclePlus className={"send-button"} size={15} />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="What do you need help with?"
            disabled={isLoading}
          />
          <AiOutlineSend
            onClick={handleSendButton}
            className={"send-button"}
            size={15}
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

export default ChatInterface;
