import { useEffect, useState } from "react";

import {
  ChainlitAPI,
  sessionState,
  useChatSession,
} from "@chainlit/react-client";
import { useRecoilValue } from "recoil";
import { Playground } from "./Playground";

const CHAINLIT_SERVER = "https://nautical-cl-be-fxhbdhovha-el.a.run.app";
const userEnv = {};

export const apiClient = new ChainlitAPI(CHAINLIT_SERVER);

function ChatChainlit() {
  const { connect, disconnect } = useChatSession();
  const session = useRecoilValue(sessionState);

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (session?.socket.connected) {
      return;
    }

    fetch(apiClient.buildEndpoint("/custom-auth"))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAccessToken(`${data.token}`)
        connect({
          client: apiClient,
          userEnv,
          accessToken: `Bearer: ${data.token}`,
        });
      });
  }, [connect]);

  return (
    <>
      <Playground accessToken={accessToken}/>
    </>
  );
}

export default ChatChainlit;
