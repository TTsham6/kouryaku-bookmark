import { GameData } from "@/types/type";
import axios, { AxiosRequestConfig, Method } from "axios";
import { createHeaders } from "../util/auth-util";
import { HttpError } from "@/util/error-handler";

const API_URL = process.env.VUE_APP_API_HOST + "/games/";
const timeout = 15000;
const headers: { [key: string]: string } = {};

/**
 *
 * @param userId
 */
export const getGamesApi = async (userId: number) => {
  const headers = createHeaders("application/x-www-form-urlencoded");
  const params = {
    user_id: String(userId)
  };
  const queryParams = new URLSearchParams(params);

  const res = await fetch(API_URL + "?" + queryParams, { headers });

  if (!res.ok) {
    throw new HttpError(res.status);
  }
  return res.json();
};

/**
 * ゲームを作成する
 * @param {GameData} newGame
 * @returns {Promise<any>}
 */
export const createGameApi = async (newGame: GameData): Promise<any> => {
  headers["Content-Type"] = "application/json";

  // if (token) {
  //   headers["Authorization"] = "Token ${authState.token}";
  //   headers["User-Id"] = String(userId);
  // }

  const config: AxiosRequestConfig = {
    url: API_URL,
    method: "post",
    headers,
    data: newGame,
    timeout
  };

  return axios(config);
};

/**
 * ゲームを更新する
 * @param {GameData} newGame
 * @returns {Promise<any>}
 */
export const updateGameApi = async (targetGame: GameData): Promise<any> => {
  headers["Content-Type"] = "application/json";

  const config: AxiosRequestConfig = {
    url: API_URL + String(targetGame.id),
    method: "put",
    headers,
    data: targetGame,
    timeout
  };

  return axios(config);
};

/**
 * ゲームを削除する
 * @param {GameData} targetGame
 */
export const deleteGameApi = async (targetGame: GameData) => {
  headers["Content-Type"] = "application/json";

  const config: AxiosRequestConfig = {
    url: API_URL + String(targetGame.id),
    method: "delete",
    headers,
    data: targetGame,
    timeout
  };

  return axios(config);
};
