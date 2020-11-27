import { AuthState } from "@/types/store-type";
import { AuthData, UserData } from "@/types/type";
import axios, { AxiosRequestConfig, Method, AxiosResponse } from "axios";
import { createHeaders } from "@/util/auth-util";
import { HttpError } from "@/util/error-handler";

const API_URL = process.env.VUE_APP_API_HOST + "/auth/";

/**
 * 認証トークンを取得する
 * @param {UserData} data
 * @return {Promise<AuthJson>}
 */
export const getToken = async function(data: UserData): Promise<AuthData> {
  const headers = createHeaders("application/json");
  const body = JSON.stringify(data);
  const res = await fetch(API_URL, { method: "POST", body, headers });

  if (!res.ok) {
    throw new HttpError(res.status);
  }
  return res.json();
};

/**
 * 認証トークンを削除する
 * @param {AuthState} authState
 * @return {Promise<AuthJson>}
 */
export const deleteToken = async (data: AuthData): Promise<AuthData> => {
  const headers = createHeaders("application/json");
  const body = JSON.stringify({ token: data.token });

  const res = await fetch(API_URL + String(data.user_id), {
    method: "DELETE",
    body,
    headers
  });

  if (!res.ok && res.status !== 401) {
    // トークン削除により認証エラーになるので401は正常系とみなし、除外する
    throw new HttpError(res.status);
  }

  return res.json();
};
