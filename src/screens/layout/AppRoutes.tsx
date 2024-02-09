import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PATH_CHAT, PATH_HISTORY } from "./RouteConstants";
import Chat from "../chat/Chat";
import History from "../history/History";
import ChatInterface from "../chat/ChatInterface";
import ChatChainlit from "../ChatChainlit/ChatChainlit";
import HistoryDetail from "../history/HistoryDetail";

type Props = {};

const AppRoutes: React.FunctionComponent<Props> = () => {
  return (
    <Routes>
      {/* <Route path={PATH_CHAT} element={<Chat />} /> */}
      {/* <Route path={PATH_CHAT} element={<ChatInterface />} /> */}
      <Route path={"/chat1"} element={<ChatInterface />} />
      <Route path={PATH_CHAT} element={<ChatChainlit />} />
      <Route path={PATH_HISTORY} element={<History />} />
      <Route path={PATH_HISTORY+"/:id"} element={<HistoryDetail />} />
      <Route path="/*" element={<Navigate to={PATH_CHAT} />} />
    </Routes>
  );
};

export default AppRoutes;
