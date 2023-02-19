<template>
  <li class="cart__order">
    <h3>{{item.product.title}}</h3>
    <b>{{item.product.price * item.quantity}} ₽</b>
    <span>Артикул: {{item.product.id}}</span>
  </li>
</template>

<script>
  export default {
    props: ['item'],
  }
</script>
