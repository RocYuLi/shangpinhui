import vue from "vue"
import VueRouter from "vue-router"

//使用插件
vue.use(VueRouter)

//引入 路由组件
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"

//先把VueRouter原型对象的push,保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace
//重写push|replace
//第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve&&reject){
         //call与apply的区别，
         //相同点，都可以调用函数一次，都可以篡改函数的上下文一次
         //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行传递的是数组
         originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
          if(resolve&&reject){
               originReplace.call(this,location,resolve,reject) 
          }else{
             originReplace.call(this,location,()=>{},()=>{})
          }
}
//配置路由
export default new VueRouter({
    //配置路由
    routes: [
        {
              
            path: "/",
            redirect:"/home",
            component: Home,
            meta:{show:true}
        },
        {
            path: "/home",
            component: Home,
            meta:{show:true}
        },
        {

            path: "/login",
            component: Login,
            meta:{show:false}
        },
        {
            path: "/register",
            component: Register,
            meta:{show:false}
        },
        {   
            name:"search",
            path: "/search/:keyword?",
            component: Search,
            meta:{show:true},
            //路由组件能不能传props数据？
            //布尔值的写法:params
            // props:true
            //对象写法：额外的给路由组件传递一些props
            //props:{a:1,b:2}
            //函数写法，可以把params参数 query参数 通过props传递给路由组件
            // props:($route)=>{
            //  return {keyword:$route.params.keyword,k:$route.query.k}
            // }
        },
    ]
})
