import { createStore } from "vuex";
import { AuthState } from "@/types/store-type";
import createPersistedState from "vuex-persistedstate";
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
        .then(res => {
          console.log(res.data);
          commit("setAuth", res.data);
        })
        .catch(err => commit("setAuth", { error: err }));
    },
    resetAuth({ commit }) {
      deleteToken(state)
        .then(() => commit("destroy"))
        .catch(err => err);
    }
  },
  mutations: {
    setAuth(state, payload: AuthState) {
      state.userId = payload.userId;
      state.token = payload.token;
    },
    destroy(state) {
      state.userId = 0;
      state.token = "";
    }
  },
  plugins: [
    createPersistedState({
      key: "example",
      storage: window.sessionStorage
    })
  ]
});
