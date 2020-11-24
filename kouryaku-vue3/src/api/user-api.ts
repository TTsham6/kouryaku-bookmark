import { UserData } from "@/types/type";
import axios, { AxiosRequestConfig } from "axios";
import store from "../store";

const API_URL = process.env.VUE_APP_API_HOST + "/users/";
const timeout = 15000;
const headers: { [key: string]: string } = {};

/**
 * ユーザーを作成する
 * @param {UserData} user
 * @returns {Promise<any>}
 */
export const createUser = async (user: UserData): Promise<any> => {
  headers["Content-Type"] = "application/json";
  if (store.getters.getToken) {
    // 取得済みのトークンとユーザーIDを設定
    headers["Authorization"] = "Token ${store.getters.token}";
    headers["User-Id"] = String(store.getters.getUserId);
  }

  const config: AxiosRequestConfig = {
    url: API_URL,
    method: "post",
    headers,
    data: user,
    timeout
  };

  return axios(config);
};
