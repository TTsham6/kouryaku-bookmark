export interface RootState {
  version: string;
}

export interface AuthState {
  user_id: number;
  token: string;
  loading: number;
  error: string;
}
