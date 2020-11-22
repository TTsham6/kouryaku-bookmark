export interface RootState {
  version: string;
}

export interface AuthState {
  userId: number;
  token: string;
  loading: number;
  error: string;
}
