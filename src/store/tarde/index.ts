import {reqAddressList,reqOrderInfo} from '@/api';

const state = {
  address:[],
  orderInfo:{}
};
const mutations = {
  GetUserAddress(state: { address: Array<object>; },address: Array<object>){
    state.address = address
  },
  GetOrderInfo(state: { orderInfo: object; },orderInfo: object){
    state.orderInfo = orderInfo
  }
};
const actions = {
  // 获取用户地址
  async getUserAddress({commit}:any){
    const result = await reqAddressList()
    // console.log(result);
    if(result.code == 200){
      commit("GetUserAddress",result.data)
    }
  },
  // 获取商品清单数据
  async getOrderInfo({commit}:any){
    const result = await reqOrderInfo()
    if(result.code == 200){
      commit("GetOrderInfo",result.data)
    }
    
  }
};
const getters = {

};
export default{
  state,
  mutations,
  actions,
  getters
}