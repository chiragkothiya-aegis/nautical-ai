import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PATH_CHAT, PATH_HISTORY } from "./RouteConstants";
import Chat from "../chat/Chat";
import History from "../history/History";
import ChatInterface from "../chat/ChatInterface";

type Props = {};

const AppRoutes: React.FunctionComponent<Props> = () => {
  return (
    <Routes>
      {/* <Route path={PATH_CHAT} element={<Chat />} /> */}
      <Route path={PATH_CHAT} element={<ChatInterface />} />
      <Route path={PATH_HISTORY} element={<History />} />
      <Route path="/*" element={<Navigate to={PATH_CHAT} />} />
    </Routes>
  );
};

export default AppRoutes;
