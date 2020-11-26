import { ResourceData } from "@/types/type";
import { createHeaders } from "@/util/auth-util";
import { HttpError } from "@/util/error-handler";

const API_HOST = process.env.VUE_APP_API_HOST;

/**
 * 一覧を取得する
 * @param {string} resourceUrl
 * @param {{ user_id: string } | { game_id: string }} params
 */
export const indexApi = async (
  resourceUrl: string,
  params?: { user_id: string } | { game_id: string }
): Promise<ResourceData[]> => {
  let url: string;
  if (params) {
    const queryParams = "?" + new URLSearchParams(params);
    url = [API_HOST, resourceUrl, queryParams].join("/");
  } else {
    url = [API_HOST, resourceUrl].join("/");
  }

  const headers = createHeaders("application/x-www-form-urlencoded");

  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new HttpError(res.status);
  }
  return res.json();
};

/**
 * データを新規作成する
 * @param {string} resourceUrl
 * @param {ResourceData} newData
 */
export const createApi = async (
  resourceUrl: string,
  newData: ResourceData
): Promise<ResourceData> => {
  const url = [API_HOST, resourceUrl].join("/");
  const body = JSON.stringify(newData);
  const headers = createHeaders("application/json");

  const res = await fetch(url, { method: "POST", body, headers });

  if (!res.ok) {
    throw new HttpError(res.status);
  }
  return res.json();
};

/**
 * 指定されたデータを更新する
 * @param {string} resourceUrl
 * @param {ResourceData} targetData
 */
export const updateApi = async (
  resourceUrl: string,
  targetData: ResourceData
): Promise<ResourceData> => {
  const url = [API_HOST, resourceUrl, String(targetData.id)].join("/");
  const body = JSON.stringify(targetData);
  const headers = createHeaders("application/json");

  const res = await fetch(url, { method: "PUT", body, headers });

  if (!res.ok) {
    throw new HttpError(res.status);
  }
  return res.json();
};

/**
 * 指定されたデータを削除する
 * @param {string} resourceUrl
 * @param {ResourceData} targetData
 */
export const deleteApi = async (
  resourceUrl: string,
  targetData: ResourceData
): Promise<ResourceData> => {
  const url = [API_HOST, resourceUrl, String(targetData.id)].join("/");
  const body = JSON.stringify(targetData);
  const headers = createHeaders("application/json");

  const res = await fetch(url, { method: "DELETE", body, headers });

  if (!res.ok) {
    throw new HttpError(res.status);
  }
  return res.json();
};
