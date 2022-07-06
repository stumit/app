<template >
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">

        <table class="order-item" v-for="(order) in myOrder.records" :key="order.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle">{{order.createTime}}订单编号：{{order.outTradeNo}} <span class="pull-right delete"><img
                      src="../images/delete.png"></span></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart,index) in order.orderDetailList" :key="cart.id">
              <td width="60%">
                <div class="typographic">
                  <img :src="cart.imgUrl" style="width:90px; height:90px;">
                  <a href="#" class="block-text">{{cart.skuName}}</a>
                  <span>x{{cart.skuNum}}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <td :rowspan="order.orderDetailList.length" v-show="index == 0" width="8%" class="center">{{order.consignee}}</td>
              <td :rowspan="order.orderDetailList.length" v-show="index == 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{order.totalAmount}}</li>
                  <li>在线支付</li>

                </ul>
              </td>
              <td :rowspan="order.orderDetailList.length" v-show="index == 0" width="8%" class="center">
                <a href="#" class="btn">{{order.orderStatusName}}</a>
              </td>
              <td :rowspan="order.orderDetailList.length" v-show="index == 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>

                </ul>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="choose-order">
         <!-- 向Pagination组件中传递数据：pageNo(默认展示那一页) pageSize(一页展示多少数据) total(一共有数据) continues(展示页码的个数)-->
        <Pagination :pageNo="pages" :pageSize="limits" :total="myOrder.total" :continues="5" @getPageNo="getPageNo"/>
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">
            Apple苹果iPhone 6s/6s Plus 16G 64G 128G
          </div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
          </div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
          </div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent,onMounted, ref } from 'vue';
import {useStore} from 'vuex';
import Pagination from '@/components/Pagination/index.vue'
export default defineComponent({
  name: "myOrder",
  components:{Pagination},
  setup(){
    const store = useStore()
    // 初始化需要传递给接口的两个参数，
    const pages = ref("1");
    const limits = ref("3");
    const getData = () => {
      const page = pages.value
      const limit = limits.value
      store.dispatch("myOrderList",{page,limit})
    }
    onMounted(() => {
      getData()
    });
    const myOrder = computed(() => {
      return store.state.order.order
    })
    const getPageNo = (pageNo:string) => {
      pages.value = pageNo
      getData()
    }
    return{
      pages,
      limits,
      myOrder,
      getPageNo
    }
  }
})
</script>
<style lang="less" scoped>
</style>