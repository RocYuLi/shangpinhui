import Vue from "vue";
import Vuex from "vuex"

//使用vuex
Vue.use(Vuex)

import home from "./home";
import search from "./search"


//对外暴漏
 const store = new Vuex.Store({
    modules:{
        home,
        search
    }
  })
  export default store