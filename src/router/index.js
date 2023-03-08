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
            component: Home
        },
        {

            path: "/login",
            component: Login
        },
        {
            path: "/register",
            component: Register
        },
        {
            path: "/search",
            component: Search
        },
    ]
})
