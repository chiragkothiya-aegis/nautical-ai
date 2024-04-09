import React, { useEffect } from "react";
import { sessionState, useChatSession } from "@chainlit/react-client";
import { useRecoilValue } from "recoil";
import { Playground } from "./Playground";
import { apiClient } from "../../shared/api-services";

function ChatChainlit() {
  const { connect, disconnect } = useChatSession();
  const session = useRecoilValue(sessionState);

  useEffect(() => {
    if (session?.socket?.connected) {
      return;
    }

    connect({
      client: apiClient,
      userEnv: {},
      accessToken: `Bearer: ${localStorage.getItem("token")}`,
    });
  }, [connect]);

  return (
    <>
      <Playground />
    </>
  );
}

export default ChatChainlit;
