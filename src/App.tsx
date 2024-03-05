import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./screens/layout/AppLayout";
import { AuthConsumer, AuthProvider } from "./shared/AuthContext/AuthContext";
import Login from "./screens/login/Login";
import {
  PATH_ABOUT,
  PATH_AUTH,
  PATH_COMPANY,
  PATH_CONTACT,
  PATH_LOGIN,
  PATH_PRODUCTS,
  PATH_SIGNUP,
} from "./screens/layout/RouteConstants";
import Home from "./screens/Home";
import Signup from "./screens/login/Signup";
import About from "./screens/About/About";
import Company from "./screens/Company/Company";
import Contact from "./screens/Contact/Contact";
import Products from "./screens/Products/Products";
import AuthHandler from "./screens/login/AuthHandler";
import "./styles/_antd.scss";
import "./App.scss";
import Footer from "./screens/Footer";

function App() {
  return (
    <>
      <div style={{height:'calc(100vh - 62px)'}}>
      <AuthProvider>
        <BrowserRouter>
          <AuthConsumer>
            {({ isAuth, updateAPICreds }) => {
              return isAuth ? (
                <AppLayout />
              ) : (
                <Routes>
                  <Route
                    path={PATH_AUTH}
                    element={<AuthHandler updateAPICreds={updateAPICreds} />}
                  />
                  {/* <Route path={PATH_LOGIN} element={<Login />} />
                <Route path={PATH_SIGNUP} element={<Signup />} /> */}
                  <Route path={PATH_ABOUT} element={<About />} />
                  <Route path={PATH_COMPANY} element={<Company />} />
                  <Route path={PATH_CONTACT} element={<Contact />} />
                  <Route path={PATH_PRODUCTS} element={<Products />} />
                  {/* <Route path={"/"} element={<Home />} /> */}
                  <Route path={"/"} element={<Home />}>
                    <Route path={PATH_LOGIN} element={<Login />} />
                    <Route path={PATH_SIGNUP} element={<Signup />} />
                  </Route>
                  <Route path="/*" element={<Navigate to={"/"} />} />
                </Routes>
              );
            }}
          </AuthConsumer>
        </BrowserRouter>
      </AuthProvider>
      </div>
      <Footer />
    </>
  );
}

export default App;
