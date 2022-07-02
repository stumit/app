import {reqCartList,reqDelCartListById,reqUpdateCheckedById} from '@/api'
const state = {
  CartList:[]
};
const mutations = {
  GetCartList(state: { CartList: any; },CartList: any){
    state.CartList = CartList
  }
};
const actions = {
  // 获取购物车所有数据
  async getCartList(context:{commit: (arg0: string, arg1: object) => void}){
    const result = await reqCartList();
    if(result.code == 200){
      //将获取到的传递到 mutations中
      context.commit("GetCartList",result.data)
    }
  },
  // 删除购物车的某个商品
  async delCartListById(commit:any,skuId:number){
    const result = await reqDelCartListById(skuId);
    if(result.code == 200){
      return "ok"
    }else{
      return Promise.reject(new Error("failed"))
    }
  },
  // 修改购物车商品的是否选中
  async updateCheckedById(commit:any,updateCart:{skuId:string,skuNum:string}){
    const result = await reqUpdateCheckedById(updateCart.skuId,updateCart.skuNum);
    if(result.code == 200){
      return "ok"
    }else{
      return Promise.reject(new Error("failed"))
    }
  },

};
// 项目中getters主要作用就是简化仓库当中的数据
const getters = {
  cartList(state: { CartList: any; }){
    return state.CartList[0] || {};
  }
};

export default{
  state,
  mutations,
  actions,
  getters
}