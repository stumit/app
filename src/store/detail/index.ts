import {reqGoodsInfo} from '@/api'
const state = {
  goodsList:{}
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
};
const getters = {
};

export default{
  state,
  mutations,
  actions,
  getters
}