import {reqGetCode,reqUserRegister} from '@/api';
const state = {
  code:''
};
const mutations = {
  GetCode( state: { code: string; },code: string){
    state.code = code;
  }
};
const actions = {
  async getCode ({commit}:any,phone:string){
    const result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GetCode",result.data)
    }
  },
  async userRegister ({commit}:any,data:any){
    const result = await reqUserRegister(data);
    if (result.code == 200) {
      try {
        return "ok"
      } catch (error) {
        Promise.reject(new Error("failed"))
      }
    }
  },
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