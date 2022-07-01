<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in skuImageList" :key="item.id">
        <img :src="item.imgUrl" :class="{active:currentIndex == index}" @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, nextTick, ref, watch} from 'vue';
  import Swiper, {Navigation} from "swiper";
  import bus from '@/libs/bus';
  export default defineComponent({
    name: "ImageList",
    props:["skuImageList"],
    setup(props){
      const currentIndex = ref(0)
      // 通过监视属性,监视bannerList
      watch(props,() =>{
          nextTick(()=>{
              new Swiper(".swiper", {
                // 使用各个模块
                modules:[Navigation],

                slidesPerView : 3,
                slidesPerGroup : 1,
                // 前进后退按钮
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",

                  hideOnClick: true,
                },
              })
          })
        },{immediate:true}
      );
      // 点击事件的回调函数
      const changeCurrentIndex =(index:number) => {
        currentIndex.value = index;
         // 通知兄弟组件
         bus.$emit('getIndex',currentIndex.value)
      };
     
      return{
        currentIndex,
        changeCurrentIndex
      }
    }
  })
</script>

<style lang="less" scoped>
  .swiper {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>