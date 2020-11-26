import store from "../store";

/**
 *
 * @param {string} contentType
 * @returns { [key: string]: string }
 */
export const createHeaders = (
  contentType: string
): { [key: string]: string } => {
  const headers: { [key: string]: string } = {};

  const token = store.getters.getToken;
  const userId = String(store.getters.getUserId);
  headers["Content-Type"] = contentType;
  headers["Authorization"] = "Token " + token;
  headers["User-Id"] = userId;

  return headers;
};
