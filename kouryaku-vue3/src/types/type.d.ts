export interface AuthData {
  id?: number;
  user_id: number;
  token: string;
}

export interface UserData {
  id?: number;
  email?: string;
  password?: string;
}

export interface GameData {
  id?: number;
  user_id?: number;
  game_name?: string;
}

export interface BookmarkData {
  id?: number;
  game_id?: number;
  bookmark_name?: string;
  url?: string;
  category?: string;
}

export type ResourceData = UserData | GameData | BookmarkData;
