/**
 * HTTPエラー情報を保持するクラス
 */
export class HttpError extends Error {
  status: number;

  constructor(status: number) {
    super(convertStatusToMsg(status));
    this.status = status;
  }
}

/**
 * エラーステータスに対応したエラーメッセージを返す
 * @param {number} status
 * @return {string}
 */
const convertStatusToMsg = (status: number): string => {
  if (status === 400) {
    return "INVALID_TOKEN";
  } else if (status === 401) {
    return "UNAUTHORIZED";
  } else if (status === 500) {
    return "INTERNAL_SERVER_ERROR";
  } else if (status === 502) {
    return "BAD_GATEWAY";
  } else if (status === 404) {
    return "NOT_FOUND";
  } else {
    return "UNHANDLED_ERROR";
  }
};
