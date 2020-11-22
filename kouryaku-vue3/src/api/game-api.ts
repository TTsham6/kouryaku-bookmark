import { GameData } from "@/types/type";
import axios, { AxiosRequestConfig } from "axios";

const API_URL = process.env.VUE_APP_API_HOST + "/games/";
const timeout = 15000;
const headers: { [key: string]: string } = {};

/**
 * ゲーム一覧を取得する
 * @param {number} userId
 * @returns {Promise<any>}
 */
export const getGamesApi = async (
  userId: number,
  token: string
): Promise<any> => {
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  if (token) {
    headers["Authorization"] = "Token ${authState.token}";
    headers["User-Id"] = String(userId);
  }

  const config: AxiosRequestConfig = {
    url: API_URL,
    method: "get",
    headers,
    timeout,
    params: {
      user_id: userId
    }
  };

  return axios(config);
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

  return axios(config)
    .then(res => res)
    .catch(err => err);
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

  return axios(config)
    .then(res => res)
    .catch(err => err);
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

  return axios(config)
    .then(res => res)
    .catch(err => err);
};
