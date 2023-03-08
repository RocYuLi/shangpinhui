import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from "@/router/index.js"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由 kv 一致 省略V
  //注册路由信息，当这里注册之后组件就拥有了 $router $route属性
  router
}).$mount('#app')
