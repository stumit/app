<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-show="!userName">
            <span>请</span>
            <!-- 声明式导航 -->
            <router-link to="/login">登录</router-link>
            <!-- 声明式导航 -->
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-show="userName">
            <span>{{userName}}</span>
            <!-- 声明式导航 -->
            <a class="register" @click="loginOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 声明式导航 -->
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyWord" />
          <!-- 编程式导航 -->
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
// 引入useRouter：一般进行编程式导航进行路由跳转
import {useRouter} from 'vue-router';
import {useStore} from 'vuex'
/*
  vue 3.x 移除了 $on 、 $off 和 $once 这几个事件 API ，
  应用实例不再实现事件触发接口
  但可以通过mitt第三方组件实现
*/ 
import bus from '@/libs/bus';
export default defineComponent({
  name: 'sphHeader',
  setup(){
    const router = useRouter();
    const store = useStore();
    let keyWord = ref('');
    // 定义一个接口,规定以后添加的数据类型
    interface LooseObject {
        [key: string]: string | object
    }
    // 点击搜索时的方法
    const goSearch = () => {
      // 通过字符串形式传参，query形式
      // router.push('/search/?k='+keyWord.value)

      // 通过对象的形式跳转并传参
      // router.push({
      //   // 通过路由配置信息当中name属性来确定跳转地址
      //   name:'search',
      //   query:{
      //     key:keyWord.value.toUpperCase()
      //   }
      // })

      // router.push({
      //   name:"search",
      //   params:{ keyword : keyWord.value || undefined }
      // })

      let location:LooseObject = {
        name:'search',
        params:{ keyword : keyWord.value || undefined }
      };

      if (router.currentRoute.value.query) {
       location.query = router.currentRoute.value.query;
      }
       router.push(location)
    }
    onMounted(() => {
      // 通过全局事件总线删除输入框文字
      bus.$on("clear",() => {
        keyWord.value = "";
      })
    })
    // 获取用户名
    const userName = computed(() => {
      return store.state.user.userInfo.name
    });
    // 退出登录
    const loginOut = async() => {
      try {
        await store.dispatch("userLogOut")
        router.push("/home")
      } catch (error:any) {
        console.log(error.message);
        
      }
      
    }
    return{
      goSearch,
      keyWord,
      userName,
      loginOut
    }
  }

})
</script>

<style lang="less" scoped>
.header {
  &>.top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }

      }

    }
  }

  &>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>