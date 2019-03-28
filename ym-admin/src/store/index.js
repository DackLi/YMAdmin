import Vue from "vue";
import Vuex from "vuex";
import user from "./module/user";
import permission from "./module/permission";
import getters from "./getter";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    permission
  },
  getters
});
