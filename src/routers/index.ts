import {createRouter, createWebHashHistory} from 'vue-router';

// 引入路由组件
import Home from '@/pages/Home/index.vue';
import Search from '@/pages/Search/index.vue';
import Login from '@/pages//Login/index.vue';
import Register from '@/pages/Register/index.vue';
import Detail from '@/pages/Detail/index.vue';
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue'
 
const routes = [
    // router参数详细看下文
    {
        // 配置路径
        path: "/home",
        name: "home",
        // 配置使用引入路由组件
        component: Home,
        // 是否显示footer组件
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
    {
        path: "/detail/:skuId", 
        name: "detail",
        component: Detail,
        meta:{
              show:true
          }
    },
    {
        path: "/addcartsuccess", 
        name: "addcartsuccess",
        component: AddCartSuccess,
        meta:{
              show:true
          }
    },
    {
        path: "/shopcar", 
        name: "shopcar",
        component: ShopCart,
        meta:{
              show:true
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
    routes: routes, //路由规则
    // 设置跳转之后滚动条的的位置
    scrollBehavior() {
        // always scroll to top
        return { top: 0 }
      },
});
export default router;