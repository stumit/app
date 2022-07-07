import { createRouter, createWebHashHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

import store from '@/store';
// 引入路由组件
import Home from '@/pages/Home/index.vue';
import Search from '@/pages/Search/index.vue';
import Login from '@/pages//Login/index.vue';
import Register from '@/pages/Register/index.vue';
import Detail from '@/pages/Detail/index.vue';
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue';
import Trade from '@/pages/Trade/index.vue';
import Pay from '@/pages/Pay/index.vue';
import PaySuccess from '@/pages/PaySuccess/index.vue';
import Center from '@/pages/Center/index.vue';
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder/index.vue'
import GroupOrder from '@/pages/Center/groupOrder/index.vue'
//  设置路由路径
const routes = [
  // router参数详细看下文
  {
    // 配置路径
    path: "/home",
    name: "home",
    // 配置使用引入路由组件
    component: Home,
    // 是否显示footer组件
    meta: {
      show: true
    }
  },
  {
    path: "/search/:keyword?",
    name: "search",
    component: Search,
    meta: {
      show: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      show: false
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      show: false
    }
  },
  {
    path: "/detail/:skuId",
    name: "detail",
    component: Detail,
    meta: {
      show: true
    }
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: {
      show: true
    }
  },
  {
    path: "/shopcar",
    name: "shopcar",
    component: ShopCart,
    meta: {
      show: true
    }
  },
  {
    path: "/trade",
    name: "trade",
    component: Trade,
    meta: {
      show: true
    },
    // 路由独享守卫
    beforeEnter: (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
      // 如果是从shopcar跳转过来的就通行
      if (from.path == "/shopcar") {
        next()
      } else {
        // 否则不跳转
        next(false)
      }
    }
  },
  {
    path: "/pay",
    name: "pay",
    component: Pay,
    meta: {
      show: true
    },
     // 路由独享守卫
     beforeEnter: (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
      // 如果是从trade跳转过来的就通行
      if (from.path == "/trade") {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: "/paysuccess",
    name: "paysuccess",
    component: PaySuccess,
    meta: {
      show: true
    }
  },
  {
    path: "/center",
    name: "center",
    component: Center,
    meta: {
      show: true
    },
    // 设置二级路由
    children:[
      {
        path:'myorder',
        component:MyOrder
      },
      {
        path:'grouporder',
        component:GroupOrder
      },
      // 重定向，如果访问/center，则跳转到/center/myorder
      {
        path: "/center",
        redirect: "/center/myorder"
      },
    ]
  },
  // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
  {
    path: "/",
    redirect: "/home"
  },
]
// 配置路由
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
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  /*
      to：用来获取要跳转的那个路由的信息
      from：用来获取你从哪个路由而来的信息
      next：放行函数，有两种写法：
      next()：直接放行
      next("路径")：指定去那个路由组件
  */
  // 获取token    
  const token = (store.state as any).user.token;
  // 获取userInfo其中的name数据
  const name = (store.state as any).user.userInfo.name;
  // 判断是否有token，如果有则不让进入登录页面
  if (token) {
    // 判断跳转的路由是否为login
    if (to.path == '/login') {
      next('/home')
    } else {
      // 去除了login的其他路由组件，则需要判断userInfo其中的数据是否存在
      if (name) {
        // 如果存在则放行
        next();
      } else {
        try {
          // 否则，重新获取用户信息
          await store.dispatch("getUserInfo");
          next()
        } catch (error) {
          // 如果还获取不到数据，则表示token失效了，需要清空token，并跳转到登录页面
          await store.dispatch("userLogOut");
          next("/login")
        }
      }
    }
  } else {
    // 未登录,不能去交易相关的页面
    if(to.path.indexOf("/trade") != -1 || to.path.indexOf("/pay") != -1 || to.path.indexOf("/center") != -1){
      // 将想要跳转的路由信息设置到地址栏中，以便登录后直接跳转到相关页面
      next(`/login?redirect=${to.path}`);
    }else{
      next()
    }   
  }

})
export default router;