import { createStore } from "vuex";
import { AuthState } from "@/types/store-type";
import createPeresistedState from "vuex-persistedstate";
import { getToken, deleteToken } from "@/api/auth-api";
import { UserData } from "@/types/type";

// const state: AuthState = {
//   userId: 1,
//   token: "token",
//   loading: 0,
//   error: ""
// };

const state: AuthState = {
  userId: 0,
  token: "",
  loading: 0,
  error: ""
};

export default createStore<AuthState>({
  state,
  getters: {
    getToken(state) {
      return state.token;
    },
    getUserId(state) {
      return state.userId;
    }
  },
  actions: {
    fetchAuth({ commit }, data: UserData) {
      getToken(state, data)
        .then(res => commit("setAuth", res.data))
        .catch(err => commit("setAuth", { error: err }));
    },
    resetAuth({ commit }) {
      deleteToken(state.token)
        .then(() => commit("destory"))
        .catch(err => err);
    }
  },
  mutations: {
    setAuth(state, payload: AuthState) {
      state.userId = payload.userId;
      state.token = payload.token;
      console.log(state);
    },
    resetAuth(state) {
      state.userId = 0;
      state.token = "";
    }
  },
  plugins: [
    createPeresistedState({
      key: "example",
      storage: window.sessionStorage
    })
  ]
});
