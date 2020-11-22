import { BookmarkData } from "@/types/type";
import axios, { AxiosRequestConfig } from "axios";

const API_URL = process.env.VUE_APP_API_HOST + "/bookmarks/";
const timeout = 15000;
const headers: { [key: string]: string } = {};

/**
 * ブックマーク一覧を取得する
 * @param {number} gameId
 * @returns {Promise<any>}
 */
export const getBookmarksApi = async (gameId: number): Promise<any> => {
  headers["Content-Type"] = "application/x-www-form-urlencoded";

  const config: AxiosRequestConfig = {
    url: API_URL,
    method: "get",
    headers,
    timeout,
    params: {
      game_id: gameId
    }
  };

  return axios(config);
};

/**
 * ブックマークを作成する
 * @param {BookmarkData} newBookmark
 * @returns {Promise<any>}
 */
export const createBookmarkApi = async (
  newBookmark: BookmarkData
): Promise<any> => {
  headers["Content-Type"] = "application/json";

  const config: AxiosRequestConfig = {
    url: API_URL,
    method: "post",
    headers,
    data: newBookmark,
    timeout
  };

  return axios(config);
};

/**
 * ゲームを更新する
 * @param {BookmarkData} targetBookmark
 * @returns {Promise<any>}
 */
export const updateBookmarkApi = async (
  targetBookmark: BookmarkData
): Promise<any> => {
  headers["Content-Type"] = "application/json";

  const config: AxiosRequestConfig = {
    url: API_URL + String(targetBookmark.id),
    method: "put",
    headers,
    data: targetBookmark,
    timeout
  };

  return axios(config);
};

/**
 * ブックマークを削除する
 * @param {GameData} targetGame
 * @returns {Promise<any>}
 */
export const deleteBookmarkApi = async (targetBookmark: BookmarkData) => {
  headers["Content-Type"] = "application/json";

  const config: AxiosRequestConfig = {
    url: API_URL + String(targetBookmark.id),
    method: "delete",
    headers,
    data: targetBookmark,
    timeout
  };

  return axios(config);
};
