import { createApp } from 'vue';
import App from './App.vue';
// 引入三级联动组件，变为全局组件
import TypeNav from '@/components/TypeNav/index.vue';
// 引入路由
import router from './routers';
// 引入vuex
import store from './store';
// 引入mockServer.ts,作用是模拟数据
import '@/mock/mokeServe';
 // swiper-bundle.min.css 决定了小圆点和左右翻页，如果不需要可以不引用
import 'swiper/css/bundle';
 // swiper.less/sass/css 决定了基础的样式
import 'swiper/css';
// 引入自己的配置注册element-ui
import {globalRegister} from '@/global';

const app = createApp(App);
// 使用 vue-router 插件
app.use(router);
// 使用vuex插件，注意此时组件实例身上会多一个$store属性
app.use(store);
// 使用自己的配置注册element-ui
app.use(globalRegister);
// 设置为全局组件，第一个参数为设置的name值，第二个参数为那个组件
app.component(TypeNav.name,TypeNav)
// 挂载实例
app.mount('#app');

      