// home模块的小仓库
// 引入axios中获取数据的模块
import {reqCategoryList,reqBannerList,reqFloorList} from '@/api';
const state = {
  // 初始化三级联动数据
  categoryList:[],
  // 初始化轮播图数据
  bannerList:[],
  // 初始化Floor数据
  floorList:[]
};
const mutations = {
  // 将传递来的数据存贮到state中
  CategoryList(state: { categoryList: Array<object> },categoryList: Array<object>){
    state.categoryList = categoryList;
  },
  // 将传递来的数据存贮到state中
  GetBannerList(state: { bannerList: Array<object> },bannerList: Array<object>){
    state.bannerList = bannerList;
  },
  // 将传递来的数据存贮到state中
  GetFloorList(state: { floorList: Array<object> },floorList: Array<object>){
    state.floorList = floorList;
  }
};
const actions = {
  //接收到categoryList，通过api接口，向服务器发送请求，获取首页三级分类数据 
  async categoryList(context:{commit: (arg0: string, arg1: Array<object>) => void}){
    const result = await reqCategoryList();
    if(result.code == 200){
      //将获取到的传递到 mutations中
      context.commit("CategoryList",result.data)
    }
  },
  // 获取首页轮播图数据
  async getBannerList(context:{commit: (arg0: string, arg1: Array<object>) => void}){
    const result = await reqBannerList();
    if(result.code == 200){
      //将获取到的传递到 mutations中
      context.commit("GetBannerList",result.data)
    }
  },
  // 获取Floor组件中的数据
  async getFloorList(context:{commit: (arg0: string, arg1: Array<object>) => void}){
    const result = await reqFloorList();
    if (result.code == 200) {
      //将获取到的传递到 mutations中
      context.commit("GetFloorList",result.data)
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