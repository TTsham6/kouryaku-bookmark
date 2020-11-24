import { AuthState } from "@/types/store-type";
import { UserData } from "@/types/type";
import axios, { AxiosRequestConfig, Method, AxiosResponse } from "axios";

const API_URL = process.env.VUE_APP_API_HOST + "/auth/";
const timeout = 15000;
const headers: { [key: string]: string } = {};

// ユーザー認証リクエスト
export const getToken = async function(
  authState: AuthState,
  data: UserData
): Promise<any> {
  // ヘッダー作成
  headers["Content-Type"] = "application/json";
  if (authState.token) {
    // 取得済みのトークンとユーザーIDを設定
    headers["Authorization"] = "Token ${authState.token}";
    headers["User-Id"] = String(authState.userId);
  }

  // リクエスト設定
  const config: AxiosRequestConfig = {
    url: API_URL,
    method: "post",
    headers,
    timeout,
    data
  };

  return axios(config);
};

export const deleteToken = async (authState: AuthState) => {
  headers["Content-Type"] = "application/json";
  if (authState.token) {
    // 取得済みのトークンとユーザーIDを設定
    headers["Authorization"] = "Token " + authState.token;
    headers["User-Id"] = String(authState.userId);
  }
  // リクエスト設定
  const config: AxiosRequestConfig = {
    url: API_URL + String(authState.userId),
    method: "delete",
    headers,
    timeout,
    data: {
      token: authState.token
    }
  };

  return axios(config);
};
