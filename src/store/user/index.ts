import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogOut} from '@/api';
import {setToken,getToken,removeToken} from '@/utils/token';
const state = {
  code:'',
  token:getToken(),
  userInfo:{}
};
const mutations = {
  GetCode(state: { code: string; },code: string){
    state.code = code;
  },
  UserLogin(state: { token: string ; },token: string){
    state.token = token;
  },
  GetUserInfo(state: { userInfo: object; },userInfo: object){
    state.userInfo = userInfo;
  },
  // 清空登录的本地数据
  UserLogOut(state: { code: string; userInfo: object; token: string | null; }){
    state.code = "";
    state.userInfo = {};
    state.token = getToken()
  }
};
const actions = {
  // 获取验证码
  async getCode ({commit}:any,phone:string){
    const result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GetCode",result.data)
    }
  },
  // 用户注册
  async userRegister ({commit}:any,data:object){
    const result = await reqUserRegister(data);
    if (result.code == 200) {
      try {
        return "ok"
      } catch (error) {
        Promise.reject(new Error("failed"))
      }
    }
  },
  // 用户登录
  async userLogin ({commit}:any,data:object){
    const result = await reqUserLogin(data);
    if (result.code == 200) {
      commit("UserLogin",result.data.token);
      setToken(result.data.token);
      return "ok";
    }else{
      return Promise.reject(new Error('failed'))
    }
    
  },
  // 获取用户信息
  async getUserInfo ({commit}:any){
    const result = await reqUserInfo();
    if (result.code == 200) {
      commit("GetUserInfo",result.data);
      return "ok"
    }else{
      return Promise.reject(new Error("失败"))
    }
  },
  // 退出登录
  async userLogOut ({commit}:any){
    const result = await reqLogOut();
    if (result.code == 200) {
      removeToken();
      commit("UserLogOut");
      return "ok"
    }else{
      return Promise.reject(new Error("错误"))
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