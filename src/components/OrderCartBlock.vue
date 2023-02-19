<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <OrderCartItem v-for="item in productsCart" :key="item.id" :item="item"/>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>{{delivery}}</b></p>
      <p>Итого: <b>{{quantityProduct}}</b> {{productWord}} на сумму <b>{{productPricePretty}} ₽</b></p>
    </div>

    <button class="cart__button button button--primery" type="submit" style="position: relative">
      <span style="position: absolute; top: calc(50% - 15px); left: 50px;" v-show="$store.state.orderSending">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" fill="none" stroke="#fff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
        </svg>
      </span>
      Оформить заказ
    </button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import productWord from '@/helpers/productWord';
  import OrderCartItem from './OrderCartItem.vue';
  import numberFormat from '@/helpers/numberFormat'

  export default {
    props: ['deliveryTypeId', 'deliveries'],
    components: { OrderCartItem },
    computed: {
      ...mapGetters(['quantityProduct', 'cartTotalPrice']),
      productsCart() {
        return this.$store.state.cartProductsData
      },
      productWord() {
        return productWord(this.quantityProduct);
      },
      itemDelivery() {
        return this.deliveries.filter((item) => item.id == this.deliveryTypeId);
      },
      totalPrice() {
        let priceDelivery = this.itemDelivery.length > 0 ? (Number(this.itemDelivery[0].price) > 0 ? 290 : 0) : 0
        return this.cartTotalPrice + priceDelivery
      },
      productPricePretty() {
        return numberFormat(this.totalPrice)
      },
      delivery() {
        return this.itemDelivery.length > 0 ? (Number(this.itemDelivery[0].price) > 0 ? '290 ₽' : 'бесплатно') : ""
      }
    },
  }
</script>
