import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PATH_CHAT, PATH_HISTORY } from "./RouteConstants";
import History from "../history/History";
import ChatChainlit from "../ChatChainlit/ChatChainlit";
import HistoryDetail from "../history/HistoryDetail";

type Props = {};

const AppRoutes: React.FunctionComponent<Props> = () => {
  return (
    <Routes>
      <Route path={PATH_CHAT} element={<ChatChainlit />} />
      <Route path={PATH_HISTORY} element={<History />} />
      <Route path={PATH_HISTORY+"/:id"} element={<HistoryDetail />} />
      <Route path="/*" element={<Navigate to={PATH_CHAT} />} />
    </Routes>
  );
};

export default AppRoutes;
