import React, { useEffect } from "react";
import { API_SERVICE, URL_AUTH } from "../../shared/api-services";

interface IAuthHandler {
  updateAPICreds: (authToken: any) => void;
}

export const AuthHandler: React.FC<IAuthHandler> = (props: IAuthHandler) => {
  const { updateAPICreds } = props;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code"); // Extract the authorization code from the URL

    if (code) {
      fetch(`${URL_AUTH}/verify_access_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data?.user_info?.id) {
            localStorage.setItem("token", data.token);
            // localStorage.setItem("user_info", data.user_info.email);
            // localStorage.setItem("name", data.user_info.name);
            // localStorage.setItem("given_name", data.user_info.given_name);
            // localStorage.setItem("family_name", data.user_info.family_name);
            // localStorage.setItem("picture", data.user_info.picture);

            getCustomAuth(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching auth token:", error);
        });
    }
  }, []);

  const getCustomAuth = (user: any) => {
    API_SERVICE.getCustomAuth({username: user.user_info.email})
      .then(({ data }) => {
        if(data?.token) {
          localStorage.setItem("token", data.token);
          updateAPICreds({ payload: user });
        } else {
          API_SERVICE.handelAPiError("")
        }
      })
      .catch((e) => API_SERVICE.handelAPiError(e));
  };

  return <div>Authenticating...</div>;
};

export default AuthHandler;
