<template>
  <div class="pagination">
    <!-- 分页 -->
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-show="StartAndEnd.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo == 1 }">1</button>
    <button v-show="StartAndEnd.start > 2">···</button>

    <button v-for="(page, index) in StartAndEnd.end" :key="index" v-show="page >= StartAndEnd.start" @click="$emit('getPageNo',page)" :class="{active:pageNo == page }" >{{page}}</button>

    <button v-show="StartAndEnd.end<totalPage-1">···</button>
    <button v-show="StartAndEnd.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo == totalPage }">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{$props.total}} 条</button>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, toRefs } from 'vue';
  // import type { PropType } from 'vue';
  export default defineComponent({
    name: "PaginaTion",
    // props:{
    //   pageNo:Number ,
    //   pageSize:Number ,
    //   total:Number ,
    //   continues:Number 
    //   },
    props:["pageNo","pageSize","total","continues"],
    emits:["getPageNo"],
    setup(props) {
      const {pageNo,pageSize,total,continues} = toRefs(props);
      // 使用计算属性计算出总共有多少页
      const totalPage = computed(() =>{
        // 向上取整
        return Math.ceil(total.value / pageSize.value);
      });
      console.log(totalPage.value);
      
      // 使用计算属性计算出开始和结束
      const StartAndEnd = computed(() =>{
        // 先定义两个开始和结束的数字
        let start = 0;
        let end = 0; 
        // 判断展示页码的个数如果大于总页数
        if (continues.value > totalPage.value) {
          start = 1;
          end = totalPage.value;
        }else{
          start = pageNo.value - Math.floor(continues.value / 2);

          end = pageNo.value + Math.floor(continues.value / 2);

          if (start < 1) {
            start = 1;
            end = continues.value;
          }
          if (end > totalPage.value) {
            start = totalPage.value - continues.value + 1;
            end = totalPage.value;
          }
        }
        return{
          start,
          end
        }
      });
      
      // console.log(Math.floor(continues.value / 2));
      // console.log(`${start.value}--${end.value}`)
      // const totals = ref(props.total.value);

      return{
        totalPage,
        StartAndEnd
      }
    }
  })
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active{
    background-color: skyblue;
  }
</style>
