import { Button, Form, Input, Spin, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useRef, useState } from "react";
import iconSend from "../../assets/images/send.svg";
import { RemoteRunnable } from "langchain/runnables/remote";
import "./Chat.scss";
import { useLocation } from "react-router-dom";

const { Paragraph } = Typography;

const Chat: React.FC = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([] as any);

  const ref: any = useRef(null);
  const [formChat] = Form.useForm() as any;

  useEffect(() => {
    if (location?.state?.question) {
      search(location?.state?.question);
      formChat.setFieldsValue({
        question: location?.state?.question,
      });
    }
  }, []);

  const setScrollPosition = () => {
    if (ref.current) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const search = async (strQuestion: string) => {
    if ((strQuestion?.length ?? 0) == 0) {
      return;
    }

    setLoading(true);
    setScrollPosition();
    const chain = new RemoteRunnable({
      url: `https://langserve-api-gcp-image-fxhbdhovha-el.a.run.app/chat`,
    });

    try {
      const result: any = await chain.invoke(strQuestion);
      const que = [...questions];
      que.push({ question: strQuestion, answer: result?.answer });
      setQuestions(que);
      console.log(result);
    } catch (error) {
      // console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    search(values?.question);
  };

  const renderInputView = () => {
    return (
      <div className="input-div">
        <Form form={formChat} size="large" onFinish={onFinish}>
          <FormItem name="question" className="input-message">
            <Input placeholder="Enter message" />
          </FormItem>
          <FormItem>
            <Button
              htmlType="submit"
              icon={
                <img src={iconSend} alt={"send"} width="30px" height="30px" />
              }
            />
          </FormItem>
        </Form>
      </div>
    );
  };

  // What is the checklist for applying for the MEC 3 certificate?
  // How is the final examination conducted for the MEC 3 certificate?
  // What are the sea service requirements for the MEC 3 certificate?
  // How long does it take to process the application for the MEC 3 certificate?
  // What are the medical examination and eyesight test requirements for the MEC 3 certificate?
  // How is the application fee for the MEC 3 certificate paid?

  return (
    <div>
      <div className="chat-view">
        {questions?.map((item: any) => {
          return (
            <>
              <span className="chat-question">{item?.question}</span>
              <Paragraph>
                <pre className="chat-answer">{item?.answer}</pre>
              </Paragraph>
            </>
          );
        })}
        <div className="loading-view">{loading && <Spin size="large" />}</div>
        <div ref={ref}></div>
      </div>
      {renderInputView()}
    </div>
  );
};

export default Chat;
