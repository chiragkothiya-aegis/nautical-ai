import { useEffect, useState } from "react";

import {
  ChainlitAPI,
  sessionState,
  useChatSession,
} from "@chainlit/react-client";
import { useRecoilValue } from "recoil";
import { Playground } from "./Playground";
import { API_SERVICE } from "../../shared/api-services";

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

    API_SERVICE.getCustomAuth()
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        setAccessToken(`${data.token}`);
        connect({
          client: apiClient,
          userEnv,
          accessToken: `Bearer: ${data.token}`,
        });
      })
      .catch((e) => API_SERVICE.handelAPiError(e));
  }, [connect]);

  return (
    <>
      <Playground accessToken={accessToken} />
    </>
  );
}

export default ChatChainlit;
