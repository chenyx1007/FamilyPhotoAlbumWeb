import Vue from 'vue'
import router from "./router"
import Axios from "axios"
import VueAxios from "vue-axios"
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import App from './App.vue'
import {message, Modal} from "ant-design-vue"
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(message);

Vue.prototype.$message = message;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;

Axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.error(error);
});

Axios.interceptors.response.use(resources => {
  return resources.data
}, error => {
  return Promise.reject(error)
})

Vue.filter('formatTime', function (timestamp) {
  let date = new Date(parseInt(timestamp))
  let years = date.getFullYear(),
      months = date.getMonth() + 1,
      days = date.getDate(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
  return `${years}-${months < 10 ? '0' + months : months}-${days < 10 ? '0' + days : days} ` +
      `${hours < 10 ? '0' + hours : hours}:` +
      `${minutes < 10 ? '0' + minutes : minutes}:` +
      `${seconds < 10 ? '0' + seconds : seconds}`
})

Vue.use(VueAxios, Axios)
Vue.use(MavonEditor)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
