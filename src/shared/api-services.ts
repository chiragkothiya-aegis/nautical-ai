import AXIOS from "axios";
import { notification } from "antd";
import { ChainlitAPI } from "@chainlit/react-client";

const CHAINLIT_SERVER = "https://nautical-cl-be-fxhbdhovha-el.a.run.app";
const apiClient = new ChainlitAPI(CHAINLIT_SERVER);

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

async function getCustomAuth() {
  const instance = createPublicInstance();
  return await instance.get(apiClient.buildEndpoint(`/custom-auth`));
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
