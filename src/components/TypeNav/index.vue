<template >
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch" >
            <div class="item" v-for="(item1,index) in categoryList" :key="item1.categoryId" :class="{cur:currentIndex == index}" @mouseenter="changeIndex(index)" >
              <h3>
                <!-- 注意必须要加 data- 前缀才能算属性名 -->
                <span :data-dataCategoryName = "item1.categoryName" :data-category1Id="item1.categoryId" >{{item1.categoryName}}</span>
              </h3>
              <div class="item-list clearfix" :style="{display:currentIndex == index ? 'block' : 'none'}">
                <div class="subitem" v-for="(item2) in item1.categoryChild" :key="item2.categoryId" >
                  <dl class="fore">
                    <dt>
                      <!-- 注意必须要加 data- 前缀才能算属性名 -->
                      <span :data-dataCategoryName = "item2.categoryName" :data-category2Id="item2.categoryId" >{{item2.categoryName}}</span>
                    </dt>
                    <dd>
                      <em v-for="(item3) in item2.categoryChild" :key="item3.categoryId">
                      <!-- 注意必须要加 data- 前缀才能算属性名,否则使用dataset属性的时候不显示 -->
                        <span :data-dataCategoryName = "item3.categoryName" :data-category3Id="item3.categoryId">{{item3.categoryName}}</span>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore} from 'vuex';
import {useRouter} from 'vue-router';
export default defineComponent({
  name: 'TypeNav',
  setup(){
    const store = useStore();
    const router = useRouter();
    // 定义一个接口,规定以后添加的数据类型
    interface LooseObject {
        [key: string]: string | object
    }
    // 用于设置三级联动菜单的显示与隐藏
    const show = ref(true);
    // 用于三级联动移入移出显示隐藏颜色
    const currentIndex = ref(-1);
    const changeIndex = (index:number) => {
      currentIndex.value = index;
    };
    const leaveIndex = () => {
      currentIndex.value = -1;
      if (router.currentRoute.value.path != "/home") {
        show.value = false;
      }
      
    };
    const enterShow = () =>{
      show.value = true
    };

    // 当组件挂载完毕就可以向服务器发送请求
    onMounted(() => {
      // 判断是否处于home路由组件
      if (router.currentRoute.value.path != "/home") {
        show.value = false;
      }
    });
    // 通过计算属性获取vuex中categoryList的数据到此组件
    const categoryList = computed(() => {
      return store.state.home.categoryList
    });

    
   // 进行路由跳转
    const goSearch = (e: MouseEvent) => {
      const element = (e.target as HTMLElement);
      
      // 通过dataset属性,获取节点的自定义属性名和属性值
      const {datacategoryname,category1id,category2id,category3id} = element.dataset
      
      if(datacategoryname){
        // 整理出路由跳转的参数
        // 引用接口
        let location:LooseObject = {name:'search'}
        // 引用接口
        let query:LooseObject = {
          categoryName : datacategoryname,
        }
        // 用来判断一级分类,二级分类,三级分类
        if (category1id) {
          query.category1Id = category1id;
        }
        if(category2id){
           query.category2Id = category2id;
        } 
        if(category3id){
          query.category3Id = category3id;
        }
        // 路由跳转时,如果带有params参数,则合并,一起带过去
        if(router.currentRoute.value.params){
          location.params = router.currentRoute.value.params
        }  
        location.query = query;

        router.push(location)
      }
    }

    return{
      categoryList,
      currentIndex,
      changeIndex,
      leaveIndex,
      goSearch,
      show,
      enterShow
    }
  }
})
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 500px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur{
          background-color: skyblue;
        }
      }
    }
  }
}
</style>