import {createRouter, createWebHashHistory} from 'vue-router';

// 引入路由组件
import Home from '@/pages/Home/index.vue';
import Search from '@/pages/Search/index.vue';
import Login from '@/pages//Login/index.vue';
import Register from '@/pages/Register/index.vue';
 
const routes = [
    // router参数详细看下文
    {
        // 配置路径
        path: "/home",
        name: "home",
        // 配置使用引入路由组件
        component: Home,
        meta:{
            show:true
        }
    },
    {
        path: "/search/:keyword?",
        name: "search",
        component: Search,
        meta:{
            show:true
        }
    },
    {
        path: "/login",  
        name: "login",
        component: Login,
        meta:{
            show:false
        }
    },
    {
      path: "/register", 
      name: "register",
      component: Register,
      meta:{
            show:false
        }
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: "/", 
        redirect:"/home"
    },
]
const router = createRouter({
    // hash 路由模式
    history: createWebHashHistory(),

    // history 路由模式
    // history: createWebHistory(),
    routes: routes //路由规则
});
export default router;