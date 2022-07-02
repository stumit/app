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
  // 删除选中的全部产品
  delAllCheckedCart({dispatch,getters}:any){
    // console.log(getters.cartList.cartInfoList);
    const promiseAll: any[] = [];
    getters.cartList.cartInfoList.forEach((item: { isChecked: number; skuId: number; }) =>{
      const promise =  item.isChecked == 1 ? dispatch("delCartListById",item.skuId) : '';
      promiseAll.push(promise)
    })
    // console.log(promiseAll);
    // console.log(Promise.all(promiseAll));
    return Promise.all(promiseAll)
    
    
  },
  // 修改全部产品的勾选状态
  updateAllChecked({dispatch,state}: any,checked: string){
    
    // console.log(state.CartList[0].cartInfoList);
    const promiseAll: any[] = [];
    state.CartList[0].cartInfoList.forEach((item: { skuId: string; }) => {
      const promise = dispatch("updateCheckedById",{skuId:item.skuId,skuNum:checked})
      promiseAll.push(promise);
    });
    // console.log(Promise.all(promiseAll));
    
    return Promise.all(promiseAll)

  }
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