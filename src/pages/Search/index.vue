<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="searchParams.trademark">{{(searchParams.trademark as string).split(":")[1]}}<i @click="removeTrademark">×</i></li>
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">{{(attrValue as string).split(":")[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo ="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne&&isAsc">⬆</span><span v-show="isOne&&isDesc">⬇</span></a>
                </li>
                <li :class="{active:isTow}" @click="changeOrder('2')">
                  <a>价格<span v-show="isTow&&isAsc">⬆</span><span v-show="isTow&&isDesc">⬇</span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src="goods.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 向Pagination组件中传递数据：pageNo(默认展示那一页) pageSize(一页展示多少数据) total(一共有数据) continues(展示页码的个数)-->
          <Pagination :pageNo="3" :pageSize="10" :total="91" :continues="5"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, onBeforeMount, onMounted, reactive, watch} from 'vue';
  import {useStore} from 'vuex';
  import {useRouter,useRoute} from 'vue-router';
  import bus from '@/libs/bus'
  import SearchSelector from './SearchSelector/SearchSelector.vue'
  import Pagination from '@/components/Pagination/index.vue'
  export default defineComponent({
    name: 'sphSearch',
    components: { SearchSelector, Pagination },
    setup(){
      const store = useStore();
      const router = useRouter();
      const route = useRoute();
      interface sechList{
        [key: string]: string | number | undefined |Array<object|string>
      }
      const searchParams:sechList = reactive({
        // 一级分类的id
        category1Id: "",
        // 二级分类的id
        category2Id: "",
        // 三级分类的id
        category3Id: "",
        // 分类名称
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器，代表当前第几页
        pageNo: 1,
        // 代表每页展示的个数
        pageSize: 10,
        // 
        props: [],
        // 品牌
        trademark: ""
      })
      // 将请求数据封装成一个函数，这样可以在你需要调用的时候直接写函数名即可
      const getData = () =>{
        store.dispatch("getSearchList",searchParams)
      }
      // 在组件加载完成之前，给searchParams中属性赋值
      onBeforeMount(() => {
        // console.log(route.params.keyword);
        // searchParams.category1Id = (route.query.category1Id as string)
        // searchParams.category2Id = (route.query.category2Id as string)
        // searchParams.category3Id = (route.query.category3Id as string)
        // searchParams.categoryName = (route.query.categoryName as string)
        // searchParams.keyword = (route.params.keyword as string)
        // 通过Object.assign(),合并对象
        Object.assign(searchParams,route.query,route.params);
      }),
      onMounted(() => {
        getData()
      });
      // 通过计算属性从vuex中的getters中获取数据
      const goodsList = computed(() => {
        return store.getters.goodsList
      });
      // 通过计算属性判断searchParams.order中是否存在1
      const isOne = computed(() => {
        return (searchParams.order as string).indexOf('1') != -1;
      })
      // 通过计算属性判断searchParams.order中是否存在2
      const isTow = computed(() => {
        return (searchParams.order as string).indexOf('2') != -1;
      })
      // 通过计算属性判断searchParams.order中是否存在asc
      const isAsc = computed(() => {
        return (searchParams.order as string).indexOf('asc') != -1;
      })
      // 通过计算属性判断searchParams.order中是否存在desc
      const isDesc = computed(() => {
        return (searchParams.order as string).indexOf('desc') != -1;
      })
      // 监听路由信息是否发生改变，如发生改变，再次发送请求
      watch(route,() =>{
        // 在发送请求之前还需更新searchParams中的数据
        Object.assign(searchParams,route.query,route.params);
        // 然后才重新发送请求
        getData();
        // 发送请求后清空1，2，3级分类的id
        searchParams.category1Id=undefined;
        searchParams.category2Id=undefined;
        searchParams.category3Id=undefined;
      })
      // 点击面包屑x，删除分类名的方法
      const removeCategoryName = () => {
        // 清空searchParams.categoryName
        searchParams.categoryName = undefined;
        searchParams.category1Id = undefined;
        searchParams.category2Id = undefined;
        searchParams.category3Id = undefined;
        // 重新发送请求
        getData();
        // 判断是否存在params参数，就是判断是否搜索框输入
        if (route.params) {
          // 重新跳转到search，相当于清空路由路径，并保留params参数
          router.push({name:"search",params:route.params})
        }
      }
      // 删除搜索框输入的关键字方法
       const removeKeyword = () => {
        // 清空searchParams.keyword
        searchParams.keyword = undefined;
        // 重新发送请求
        getData();
        //通过bus通知Header组件中输入框清空
        bus.$emit("clear");
        // 进行路由跳转
        if (route.query) {
          router.push({name:"search",query:route.query})
        }
      }
      // 收集 trademark 自定义事件的回调
      const trademarkInfo = (trademark: { tmId: string; tmName: string; }) =>{
        // 给searchParams.trademark赋值
        searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
        // 重新发送请求
        getData();
      }
      // 删除品牌标签
      const removeTrademark =() =>{
        // 清空searchParams.trademark
        searchParams.trademark = undefined;
        // 重新发送请求
        getData();
      }
      // 收集 props 自定义事件的回调
      const attrInfo = (attrs: { attrId: string; attrName: string; },attrValue: string) => {
        
        // 获取从子组件返回来的数据
        const prop = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
        
        // 将数据添加到searchParams.props中
        // 需要数组去重
        if ((searchParams.props as Array<string>).indexOf(prop) == -1) {
          (searchParams.props as Array<string>).push(prop);
        }
        // 发送请求
        getData()
      }
      // 删除详情标签
      const removeAttr = (index:number) => {
        // 通过数组splice方法，删除props数组当中所引致的数据
        (searchParams.props as Array<string>).splice(index,1);
        // 发送请求
        getData()
      }
      const changeOrder = (flag:string) =>{
        const originOrder = searchParams.order as string;
        // 通过split分别获取，起始searchParams.order中的数据
        const originFlag = originOrder.split(":")[0];
        const originSort = originOrder.split(":")[1];

        // 准备一个空字符串，用于保存新的order中的数据
        let newOrder = '';
        if (flag == originFlag) {
          newOrder = `${originFlag}:${originSort == "desc"? "asc":"desc"}`;
        }else{
          newOrder = `${flag}:desc`;
        }
        // 将newOrder保存到searchParams.order中
        searchParams.order = newOrder;
        // 重新发送请求
        getData();
      }
      return{
        goodsList,
        searchParams,
        removeCategoryName,
        removeKeyword,
        trademarkInfo,
        removeTrademark,
        attrInfo,
        removeAttr,
        isOne,
        isTow,
        isAsc,
        isDesc,
        changeOrder
      }
    }

  }) 
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }
            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>