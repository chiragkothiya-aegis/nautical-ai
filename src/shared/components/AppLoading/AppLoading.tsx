import { Spin } from "antd";
import React from "react";
import "./AppLoading.scss";

interface IAppLoading {}

const AppLoading: React.FunctionComponent<IAppLoading> = (
  props: IAppLoading
) => {
  return (
    <div className="loader-view">
      <Spin size="large" />
    </div>
  );
};

export default AppLoading;
