import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./screens/layout/AppLayout";
import { AuthConsumer, AuthProvider } from "./shared/AuthContext/AuthContext";
import Login from "./screens/login/Login";
import { PATH_LOGIN, PATH_SIGNUP } from "./screens/layout/RouteConstants";
import Home from "./screens/Home";
import "./styles/_antd.scss";
import "./App.scss";
import Signup from "./screens/login/Signup";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthConsumer>
          {({ isAuth, apiCreds }) => {
            return isAuth ? (
              <AppLayout />
            ) : (
              <Routes>
                <Route path={PATH_LOGIN} element={<Login />} />
                <Route path={PATH_SIGNUP} element={<Signup />} />
                <Route path={"/"} element={<Home />} />
                <Route path="/*" element={<Navigate to={"/"} />} />
              </Routes>
            );
          }}
        </AuthConsumer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
