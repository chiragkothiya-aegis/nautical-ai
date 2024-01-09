import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_CHAT } from "../layout/RouteConstants";
import "./History.scss"

function History() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    {
      question: "What is the checklist for applying for the MEC 3 certificate?",
    },
    {
      question:
        "How is the final examination conducted for the MEC 3 certificate?",
    },
    {
      question:
        "What are the sea service requirements for the MEC 3 certificate?",
    },
    {
      question:
        "How long does it take to process the application for the MEC 3 certificate?",
    },
    {
      question:
        "What are the medical examination and eyesight test requirements for the MEC 3 certificate?",
    },
    {
      question: "How is the application fee for the MEC 3 certificate paid?",
    },
  ] as any);

  return (
    <div className="history-view">
      {questions?.map((item: any) => {
        return (
          <Button
            type="text"
            style={{ textAlign: "left" }}
            onClick={() => {
              navigate(PATH_CHAT, { state: { question: item?.question } });
            }}
          >
            {item?.question}
          </Button>
        );
      })}
    </div>
  );
}

export default History;
