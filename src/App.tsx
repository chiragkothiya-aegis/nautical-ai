import React, { useEffect } from "react";
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
  
  // useEffect(() => {
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiY2hpcmFnaW9zLmFlZ2lzQGdtYWlsLmNvbSIsIm1ldGFkYXRhIjp7fSwiZXhwIjoxNzEyNzMwMzkxfQ.Jz1mLl8bDonkc4D8lM9GjlzOcJn65HE81wt3hVlBcMc";
  //   const user = {
  //     user_info: {
  //       id: "106703632203912445331",
  //       email: "chiragios.aegis@gmail.com",
  //       verified_email: true,
  //       name: "Chirag Kothiya",
  //       given_name: "Chirag",
  //       family_name: "Kothiya",
  //       picture:
  //         "https://lh3.googleusercontent.com/a/ACg8ocLwMYoU5xVUHdjSvoLm3lWRw27jBcWPX1UAspA73L4-=s96-c",
  //       locale: "en",
  //     },
  //     token: token,
  //   };
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("user", JSON.stringify(user));
  // });

  return (
    <>
      <div style={{ height: "calc(100vh - 62px)" }}>
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
