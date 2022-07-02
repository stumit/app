import {reqGoodsInfo,reqAddShopCart} from '@/api'
import {getUUID} from '@/utils/uuid_token'
const state = {
  goodsList:{},
  // 临时身份
  uuid_token:getUUID()
};
const mutations = {
  GetGoodsList(state: { goodsList: object; },goodsList: object){
    state.goodsList = goodsList
  }
};
const actions = {
  async getGoodsInfo(context:{commit: (arg0: string, arg1: object) => void},stuId:string){
    const result = await reqGoodsInfo(stuId);
    if(result.code == 200){
      //将获取到的传递到 mutations中
      context.commit("GetGoodsList",result.data)
    }
  },
  async addDataShopCart(context: any,com:{skuId:string,skuNum:string}){
    const result = await reqAddShopCart(com.skuId,com.skuNum)
    if (result.code == 200) {
      return "ok"
    }else{
      return Promise.reject(new Error('failed'))
    }
  }
};
const getters = {
  categoryView(state: { goodsList: { categoryView: object; }; }){
    return state.goodsList.categoryView || {}
  },
  skuInfo(state: { goodsList: { skuInfo: object; }; }){
    return state.goodsList.skuInfo || {}
  },
  spuSaleAttrList(state: { goodsList: { spuSaleAttrList: Array<object>; }; }){
    return state.goodsList.spuSaleAttrList || []
  },
};

export default{
  state,
  mutations,
  actions,
  getters
}