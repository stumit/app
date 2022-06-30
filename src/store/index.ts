import { createStore } from "vuex";
// state:仓库存储数据的地方
// const state = {
//   const : 1
// };
// mutations：修改state的唯一手段
// const mutations = {
//   Add(state: { const: number; }){
//     state.const++
//   }
// };
// actions：处理action，可以书写自己的业务逻辑，也可以处理异步
// const actions = {
//   add(context: { commit: (a : string) => void; }){
//     context.commit('Add')
//   }
// };
// getters：可以理解为计算属性，用于简化仓库数据，让组件更加方便获取仓库数据
// const getters = {};

// 引入小仓库（就是将vuex模块化，让不同组件数据存放在不同的模块中）
import home from './home';
import search from './search';
import detail from './detail'
export default createStore({
  // state,
  // getters,
  // mutations,
  // actions,

  // 实现vuex模块化开发存储数据
  modules:{
    home,
    search,
    detail
  }
});