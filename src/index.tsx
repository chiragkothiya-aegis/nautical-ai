import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./shared/authConfig";

// Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.scss";
import { RecoilRoot } from "recoil";

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      {/* Create cliend id from following url
    https://console.cloud.google.com/apis/credentials?project=nauticalai */}
      {/* <GoogleOAuthProvider clientId="191151223775-4ld2994ucoec8ji73mi9ldsem6d16htr.apps.googleusercontent.com"> */}
        <RecoilRoot>
          <App />
        </RecoilRoot>
      {/* </GoogleOAuthProvider> */}
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
