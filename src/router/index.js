import vue from "vue"
import VueRouter from "vue-router"

//使用插件
vue.use(VueRouter)

//引入 路由组件
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"
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
            path: "/search/:keyword",
            component: Search,
            meta:{show:true},
            //路由组件能不能传props数据？
            //布尔值的写法:params
            //props:true
            //对象写法：额外的给路由组件传递一些props
            //props:{a:1,b:2}
            //函数写法，可以把params参数 query参数 通过props传递给路由组件
            // props:($route)=>{
            //  return {keyword:$route.params.keyword,k:$route.query.k}
            // }
        },
    ]
})
