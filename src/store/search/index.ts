import {reqGetSearchInfo} from '@/api'
const state = {
  searchList:{}
};
const mutations = {
  GetSearchList(state: { searchList: object; },searchList: object){
    state.searchList = searchList
  }
};
const actions = {
  async getSearchList(context:{commit: (arg0: string, arg1: object) => void},params={}){
    const result = await reqGetSearchInfo(params);
    if(result.code == 200){
      //将获取到的传递到 mutations中
      context.commit("GetSearchList",result.data)
    }
  }
};
// 项目中getters主要作用就是简化仓库当中的数据
const getters = {
  goodsList(state: { searchList: { goodsList: Array<object>; }; }){
    return state.searchList.goodsList || []
  },
  attrsList(state: { searchList: { attrsList: Array<object>; }; }){
    return state.searchList.attrsList || []
  },
  trademarkList(state: { searchList: { trademarkList: Array<object>; }; }){
    return state.searchList.trademarkList || []
  }
};

export default{
  state,
  mutations,
  actions,
  getters
}