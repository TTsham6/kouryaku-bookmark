import { Module } from "vuex";
import { AuthState, RootState } from "@/types/store-type";
import { UserData } from "@/types/type";
import { request } from "@/api/auth-api";

const state: AuthState = {
  userId: 0,
  token: "",
  loading: 0,
  error: ""
};

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  getters: {
    getToken(state) {
      return state.token;
    }
  },
  actions: {
    fetchAuth({ commit }, data: UserData) {
      request(state, data, "post")
        .then(res => commit("setAuth", res))
        .catch(err => err);
    },
    resetAuth({ commit }, data: UserData) {
      request(state, data, "delete")
        .then(res => commit("create", res))
        .catch(err => err)
        .finally(() => commit("destory"));
    }
  },
  mutations: {
    setAuth(state, payload: AuthState) {
      state.userId = payload.userId;
      state.token = payload.token;
    },
    resetAuth(state) {
      state.userId = 0;
      state.token = "";
    }
  }
};
