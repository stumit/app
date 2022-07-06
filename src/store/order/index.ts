// home模块的小仓库
// 引入axios中获取数据的模块
import {reqMyOrder} from '@/api';
const state = {
  order:{},
};
const mutations = {
  // 将传递来的数据存贮到state中
  MyOrderList(state: {order:object},order:object){
    state.order = order;
  }
};
const actions = {
  //接收到myOrderList，通过api接口，向服务器发送请求，获取我的订单列表数据 
  async myOrderList({commit}:any,data:{page: string,limit: string}){
    const result = await reqMyOrder(data.page,data.limit);
    if(result.code == 200){
      //将获取到的传递到 mutations中
      commit("MyOrderList",result.data)
    }
  }
};
const getters = {};

export default{
  state,
  mutations,
  actions,
  getters
}