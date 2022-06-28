<template>
  <Header/>
  <!-- 路由组件出口 -->
  <router-view></router-view>
  <!-- 通过路由中meta和v-show实现Footer的显示与隐藏 -->
  <Footer v-show="$route.meta.show"/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore} from 'vuex';
import Header from './components/Header/index.vue';
import Footer from './components/Footer/index.vue'
export default defineComponent({
  name: 'App',
  components:{
    Header,
    Footer
  },
  setup(){
    const store = useStore();
    // 将发送请求放到根组件中,为了只请求一次数据保存到vuex仓库中,之后都从vuex仓库中获取,提升性能
    onMounted(() =>{
      // 通知vuex,在vuex中发送请求，获取数据，将数据存储到仓库中等操作
      store.dispatch('categoryList');
    })
  }
});
</script>

<style>

</style>
