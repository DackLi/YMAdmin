import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

import "normalize.css/normalize.css"; // 样式重置

import ElementUI from "element-ui"; // element ui
import "element-ui/lib/theme-chalk/index.css";

import "@/style/index.scss"; // 引入的scss样式
import "./permission"; // 权限控制

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
