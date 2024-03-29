// 对axios的二次封装


import store from '@/store';
// 引入axios
import axios from 'axios';
// nprogress 引入进度条
import nprogress from 'nprogress';
// 引入样式
import "nprogress/nprogress.css";

/*
  利用axios对象中方法create，创建一个axios实例
  然后再配置一下
*/ 
const request = axios.create({
  // 配置对象
  // 基础路径，当发送请求时，路径中自动填写/api
  baseURL:"/api",
  // 请求不能超过5秒
  timeout:5000
});

// 请求拦截器:在请求之前做一些事
request.interceptors.request.use((config) => {
  
  if(localStorage.getItem("UUIDTOKEN")){
    // 请求头添加一个字段（userTempId）和后台商量好
    (config.headers)!.userTempId = (localStorage.getItem("UUIDTOKEN") as string)
  }
  // 在请求头中添加token信息
  if ((store.state as any).user.token) {
    config.headers!.token = (store.state as any).user.token
  }
  // 进度条开始移动
  nprogress.start();
  // config:配置对象，其中有一个属性很重要，headers请求头
  return config;
})
// 响应拦截器：在请求之后做一些事
request.interceptors.response.use((res) => {
  // 成功的回调函数，当服务器数据返回之后，可以处理一些事情
  // 进度条结束
  nprogress.done();
  return res.data
},() => {
  // 失败的回调函数
  return Promise.reject(new Error('failed'));
})
export default request;