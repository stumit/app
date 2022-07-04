<template >
  <!-- 三级联动全局组件，当设置为全局组件则不用引入，直接使用 -->
  <TypeNav/>
  <ListContainer/>
  <RecoMmend/>
  <Rank/>
  <Like/>
  <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
  <Brand/>
  <!-- <span>{{num}}</span>
  <button @click="add">点击加1</button>
  <button>点击减1</button> -->
</template>
<script lang="ts">
import {computed, defineComponent, onMounted } from 'vue';
import {useStore} from 'vuex';
import {removeToken} from '@/utils/token'

import ListContainer from './ListContainer/index.vue';
import RecoMmend from './RecoMmend/index.vue';
import Rank from './Rank/index.vue';
import Like from './Like/index.vue';
import Floor from './Floor/index.vue';
import Brand from './Brand/index.vue';

export default defineComponent({
    name: "sphHome",
    components:{
      ListContainer,
      RecoMmend,
      Rank,
      Like,
      Floor,
      Brand
    },
    setup() {
      const store = useStore()
      // 当组件加载完毕时,向vuex发送请求
      onMounted(() => {
        store.dispatch("getFloorList");
      });
      // 从vuex中获取数据
      const floorList =  computed(() => {
        return store.state.home.floorList;
      });
      
      return{
        floorList
      }
    }
})
</script>
<style lang="less" scoped>

</style>