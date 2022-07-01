<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <!-- 绿色的蒙版 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent,onMounted, ref} from 'vue';
  import bus from '@/libs/bus';
  export default defineComponent({
    name: "sphZoom",
    props:['skuImageList'],
    setup(props){
      const currentIndex =ref(0);
      const mask = ref< HTMLElement | null>(null) 
      const big = ref< HTMLElement | null>(null) 
      const imgObj = computed(() =>{
        return props.skuImageList[currentIndex.value] || {}
      });
      onMounted(() => {
        // 获取兄弟组件的数据
        bus.$on('getIndex',(index:number) => {
          // console.log(index);
          currentIndex.value = index
        })
      });
      const handler = (e:MouseEvent) =>{
        if (mask.value && big.value) {
          // 获取鼠标位置
          let left = e.offsetX - mask.value.offsetWidth/2;
          let top = e.offsetY - mask.value.offsetHeight/2;
          // 判断鼠标鼠标，不能超过边界
          if(left<= 0){
            left = 0
          }
          if(left>=mask.value.offsetWidth){
            left = mask.value.offsetWidth
          }
          if(top<= 0){
            top = 0
          }
          if(top>=mask.value.offsetHeight){
            top = mask.value.offsetHeight
          }

          //设置绿色蒙版的位置 
          mask.value.style.left = left+'px';
          mask.value.style.top = top +'px';
          // 设置放大图片的位置
          big.value.style.left = -2 * left+'px';
          big.value.style.top = -2 * top+'px';
        } 
        
      }
      return{
        imgObj,
        currentIndex,
        handler,
        mask,
        big
      }
    }
  })
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>