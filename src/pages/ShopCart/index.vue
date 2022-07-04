<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.cartPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)" >删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" @change="updateAllChecked" :checked="isAllCheck && cartInfoList.length > 0">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade" >结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted} from 'vue';
import { useStore} from 'vuex';
import {useRouter} from 'vue-router';
  export default defineComponent({
    name: 'ShopCart',
    setup(){
      const store = useStore();
      const router = useRouter();
      const getCartList = () => {
        store.dispatch("getCartList")
      };
      onMounted(() => {
        getCartList()
      });
      const cartList = computed(() => {
        return store.getters.cartList;
      });
      // 购物车数据
      const cartInfoList = computed(() => {
        return cartList.value.cartInfoList || [];
      });
      // 计算总和
      const totalPrice = computed(() => {
        let sum = 0;
        cartInfoList.value.forEach((item: { skuPrice: number; skuNum: number; }) => {
          sum += item.skuPrice *item.skuNum
        });
        return sum
      });
      // 判断复选框是否勾选
      const isAllCheck = computed(() => {
        return cartInfoList.value.every((time: { isChecked: number; }) => time.isChecked == 1)
      });
      // 删除某一个产品的数据
      const deleteCartById = async (cart: { skuId: string; }) => {
        try {
          // 如果删除成功则重新发送请求
          await store.dispatch("delCartListById",cart.skuId);
          getCartList();
        } catch (error:any) {
          // 如果失败则展示失败的数据
          console.log(error.message);
          
        }
      };
      // 删除勾选的所有产品的数据
      const deleteAllCheckedCart = async () => {
        try {
          await store.dispatch("delAllCheckedCart");
          getCartList()
        } catch (error:any) {
          console.log(error.message);
        }
        
      }
      // 修改某一个产品的勾选状态
      const updateChecked = async(cart: { skuId: string; },event: any) => {
        // console.log(cart);
        // console.log(event.target.checked);
        // 成功
        try {
          const checked = event.target.checked ? "1" : "0";
          // 通知vuex发送请求
          await store.dispatch("updateCheckedById",{skuId:cart.skuId,skuNum:checked});
          // 重新获取数据
          getCartList()
        } catch (error:any) { //失败
          // 展示失败的信息
          console.log(error.message);
        }
      };
      // 修改某全部产品的勾选状态
      const updateAllChecked = async(event:Event) => {
        try {
          const checked = (event.target as HTMLInputElement).checked ? "1" : "0";
          await store.dispatch("updateAllChecked",checked);
          getCartList();
        } catch (error:any) {
          console.log(error.message);
        }
        
      } 
      const goTrade = () =>{
        router.push('/trade')
      }
      return{
        cartList,
        cartInfoList,
        totalPrice,
        isAllCheck,
        deleteCartById,
        deleteAllCheckedCart,
        updateChecked,
        updateAllChecked,
        goTrade
      };
    }
  })
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>