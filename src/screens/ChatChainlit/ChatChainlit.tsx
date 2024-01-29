import { useEffect } from "react";

import {
  ChainlitAPI,
  sessionState,
  useChatSession,
} from "@chainlit/react-client";
import { useRecoilValue } from "recoil";
import { Playground } from "./Playground";

const CHAINLIT_SERVER = "https://nautical-cl-be-fxhbdhovha-el.a.run.app";
const userEnv = {};

const apiClient = new ChainlitAPI(CHAINLIT_SERVER);

function ChatChainlit() {
  const { connect, disconnect } = useChatSession();
  const session = useRecoilValue(sessionState);

  useEffect(() => {
    if (session?.socket.connected) {
      return;
    }

    fetch(apiClient.buildEndpoint("/custom-auth"))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        connect({
          client: apiClient,
          userEnv,
          accessToken: `Bearer: ${data.token}`,
        });
      });
  }, [connect]);

  return (
    <>
      <Playground />
    </>
  );
}

export default ChatChainlit;
