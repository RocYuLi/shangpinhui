//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nProgress from "nprogress";
//start方法 进度条开始 done进度条结束
//1.利用axios对象方法创建create,创建一个axios实例
import "nprogress/nprogress.css"
const requests = axios.create({
    //配置对象
    //基础路径：就是在你请求前面加的
    baseURL:"/api",
    //请求超时的时间5S
    timeout:5000
})

//请求拦截器
requests.interceptors.request.use((config)=>{
  //config:配置对象，有一个属性很重要 header请求头
  //进度条开始
  nProgress.start()
  return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
   //成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到
   //进度条结束
   nProgress.done()
   return res.data
},(error)=>{
   return Promise.reject(error)
})

export default requests