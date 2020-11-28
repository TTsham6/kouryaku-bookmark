import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { getToken, deleteToken } from "@/api/auth-api";
import { AuthData, UserData } from "@/types/type";
import router from "@/router";

const defaultState: AuthData = {
  id: 0,
  user_id: 0,
  token: ""
};

export default createStore<AuthData>({
  state: defaultState,
  getters: {
    getToken(state) {
      return state.token;
    },
    getUserId(state) {
      return state.user_id;
    }
  },
  actions: {
    async fetchAuth({ commit }, data: UserData) {
      try {
        const res = await getToken(data);
        commit("setAuth", res);
        await router.push("/");
      } catch (e) {
        console.log(e.message);
      }
    },
    async resetAuth({ commit, state }) {
      try {
        const res = await deleteToken(state);
        commit("destroyAuth", res);
        await router.push("/login");
      } catch (e) {
        console.log(e.message);
      }
    }
  },
  mutations: {
    setAuth(state, payload: AuthData) {
      state.user_id = payload.user_id;
      state.token = payload.token;
      console.log(state);
    },
    destroyAuth(state, payload: AuthData) {
      console.log(payload);
      Object.assign(state, defaultState);
    }
  },
  plugins: [
    createPersistedState({
      key: "example",
      storage: window.sessionStorage
    })
  ]
});
