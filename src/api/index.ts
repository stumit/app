// 这个模块就是对Api进行统一管理

// 引入自己对api接口获取数据，axios的二次封装模块
import request from './request';

// 引入自己对mock接口获取模块数据，axios的二次封装模块
import mockRequest from './mockAjax'

/*
  三级联动的接口
  /api/product/getBaseCategoryList
  get请求
  无参数
*/
// 获取三级联动数据并暴露出去
export const reqCategoryList = () => request({url:'/product/getBaseCategoryList',method:'get'}) 

// 获取Home组件轮播图数据并暴露出去
export const reqBannerList = () => mockRequest({url:'/banner',method:'get'}) 

// 获取Floor组件中的数据并暴露出去
export const reqFloorList = () => mockRequest({url:'/floor',method:'get'})

// 获取搜索模块数据 接口/api/list 请求方式POST
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/ 
export const reqGetSearchInfo = (params:object) => request({url:'/list',method:'post',data:params})

/*
  获取商品详情页面数据
  接口：/api/item/{ skuId }
  请求方式：get
*/ 
export const reqGoodsInfo = (skuId:string) => request({url:`/item/${skuId}`,method:'get'})

/*
  添加到购物车
  接口：/api/cart/addToCart/{ skuId }/{ skuNum }
  请求方式：post
*/ 
export const reqAddShopCart = (skuId:string,skuNum:string) => request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

/*
  购物车详情列表
  接口：/api/cart/cartList
  请求方式：get
*/ 
export const reqCartList = () => request({url:'/cart/cartList',method:'get'})

/*
  删除购物车产品
  接口： /api/cart/deleteCart/{skuId}
  请求方式：DELETE
*/
export const reqDelCartListById = (skuId:number) => request({url:`/cart/deleteCart/${skuId}`,method:'delete'})

/*
  切换商品选中状态
  接口：/api/cart/checkCart/{skuID}/{isChecked}
  请求方式：get
*/ 
export const reqUpdateCheckedById = (skuID:string,isChecked:string) => request({url:`/cart/checkCart/${skuID}/${isChecked}`,method:'get'})
