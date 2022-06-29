<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>···</button>
    <button>{{totalPage}}</button>
    <button>下一页</button>
    
    <button style="margin-left: 30px">共 {{$props.total}} 条</button>
    <h3>{{start}}--{{end}}---{{$props.pageNo}}</h3>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, toRefs } from 'vue';
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
    setup(props) {
      const {pageNo,pageSize,total,continues} = toRefs(props)
      // 先定义两个开始和结束的数字
      let start = ref(0);
      let end = ref(0); 
      // 使用计算属性计算出总共有多少页
      const totalPage = computed(() =>{
        // 向上取整
        return Math.ceil(total.value / pageSize.value);
      });
      // 判断展示页码的个数如果大于总页数
      if (continues.value > totalPage.value) {
        start.value = 1;
        end.value = totalPage.value;
      }else{
        start.value = pageNo.value - Math.floor(continues.value / 2);
        end.value = pageNo.value + Math.floor(continues.value / 2);
        if (start.value < 1) {
          start.value = 1;
          end.value = continues.value;
        }
        if (end.value > totalPage.value) {
          start.value = totalPage.value - continues.value + 1;
          end.value = totalPage.value;
        }
      }
      // console.log(totalPage.value);
      console.log(`${start.value}--${end.value}`)
      // const totals = ref(props.total.value);
      return{
        totalPage,
        start,
        end
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
</style>
