<template>
  <li class="cart__order">
    <h3>{{item.product.title}}</h3>
    <b>{{pricePretty}} ₽</b>
    <span>Артикул: {{item.product.id}}</span>
  </li>
</template>

<script>
  import numberFormat from '@/helpers/numberFormat';

  export default {
    props: ['item'],
    computed: {
      pricePretty() {
        return numberFormat(this.item.price * this.item.quantity)
      },
    }
  };
</script>
