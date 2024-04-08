import AXIOS from "axios";
import { notification } from "antd";
import { ChainlitAPI } from "@chainlit/react-client";

//export const URL_AUTH = "https://nautical-authentication-backend-prod-fxhbdhovha-el.a.run.app";

export const URL_AUTH = "https://rueq4tqxma.ap-southeast-2.awsapprunner.com";
// const CHAINLIT_SERVER = "https://nautical-cl-be-fxhbdhovha-el.a.run.app";
//export const CHAINLIT_SERVER = "https://nautical-chainlit-backend-prod-fxhbdhovha-el.a.run.app";
export const CHAINLIT_SERVER ="https://g7qxq265pm.ap-southeast-2.awsapprunner.com";

export const apiClient = new ChainlitAPI(CHAINLIT_SERVER);

function createPublicInstance() {
  const headers: any = {};

  const token = localStorage.getItem("token");
  if ((token?.length ?? 0) > 0) {
    headers["Authorization"] = "Bearer " + token;
  }

  return AXIOS.create({
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

const handelAPiError = (error: any) => {
  const params = error?.response?.data;
  const message = params?.detail ?? "something went wrong!";
  notification.error({
    message: message,
  });
  return message;
};

async function getCustomAuth(payload: any) {
  const instance = createPublicInstance();
  return await instance.post(apiClient.buildEndpoint(`/custom-auth`), payload);
}

async function threads(payload: any) {
  const instance = createPublicInstance();
  return await instance.post(apiClient.buildEndpoint(`/project/threads`), payload);
}

async function threadDetail(id: string) {
  const instance = createPublicInstance();
  return await instance.get(apiClient.buildEndpoint(`/project/thread/${id}`));
}

export const API_SERVICE = {
  handelAPiError,
  getCustomAuth,
  threads,
  threadDetail,
};
