import { UserData } from "@/types/type";
import axios, { AxiosRequestConfig } from "axios";

const API_URL = process.env.VUE_APP_API_HOST + "/user/";
const timeout = 15000;
const headers: { [key: string]: string } = {};

/**
 * ユーザーを作成する
 * @param {UserData} user
 * @returns {Promise<any>}
 */
export const createUser = async (user: UserData): Promise<any> => {
  headers["Content-Type"] = "application/json";

  const config: AxiosRequestConfig = {
    url: API_URL,
    method: "post",
    headers,
    data: user,
    timeout
  };

  return axios(config);
};
