//home模块小仓库
import {reqCategoryList} from "@/api"
//state 仓库 用来存储数据
const state = {
    //state中数据默认初始值 不要乱写，服务器返回是对象，返回就是对象【根据接口返回值初始】
    categoryList:[],
};
//mutation:修改state唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
       state.categoryList = categoryList;
    }
};
//action 处理action 可以书写自己的逻辑业务 可以处理异步
const actions = {
    //可以书写业务逻辑 但是不能修改state
     //通过api里的接口函数调用，向服务器发送请求，获取服务器数据
   async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code == 200){
            commit("CATEGORYLIST",result.data)
        }
    }
  
};
//getters 理解为计算属性,用于简化仓库数据 让组件获取仓库数据更加方便
const getters = {}

//对外暴漏
export default {
    state,
    mutations,
    actions,
    getters,
}
