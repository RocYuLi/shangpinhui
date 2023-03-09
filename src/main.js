import Vue from 'vue'
import App from './App.vue'
//三级联动组件--全局组件
import TypeNav from "@/pages/Home/TypeNav"
//第一个参数:全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)


//引入路由
import router from "@/router/index.js"
Vue.config.productionTip = false
//测试
import {reqCategoryList} from "@/api"
reqCategoryList()

new Vue({
  render: h => h(App),
  //注册路由 kv 一致 省略V
  //注册路由信息，当这里注册之后组件就拥有了 $router $route属性
  router
}).$mount('#app')
