import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'

import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 请求拦截器  携带token
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
// 响应拦截器  token失效问题 和后端约定一个失效状态码10011
// axios.interceptors.response.use(
//   function(response) {
//     if (response.data.meta.status === 100011) {
//       this.$router.push('/login')
//     }

//     return response
//   },
//   function(error) {
//     // Do something with response error
//     return Promise.reject(error)
//   }
// )
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
