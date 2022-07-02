import {reqCartList} from '@/api'
const state = {
  CartList:[]
};
const mutations = {
  GetCartList(state: { CartList: any; },CartList: any){
    state.CartList = CartList
  }
};
const actions = {
  async getCartList(context:{commit: (arg0: string, arg1: object) => void}){
    const result = await reqCartList();
    if(result.code == 200){
      //将获取到的传递到 mutations中
      context.commit("GetCartList",result.data)
    }
  }

};
// 项目中getters主要作用就是简化仓库当中的数据
const getters = {
};

export default{
  state,
  mutations,
  actions,
  getters
}