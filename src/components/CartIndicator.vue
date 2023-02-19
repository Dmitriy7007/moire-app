<template>
  <router-link v-slot="{ navigate, href }" custom class="header__cart" to="/cart" aria-label="Корзина с товарами" tag="div">
    <div :href="href" @click="navigate" @keypress.enter="navigate" role="link">
      <svg width="19" height="24">
        <use xlink:href="#icon-cart"></use>
      </svg>
      <span class="header__count" aria-label="Количество товаров" v-if="$store.state.cartLoading">loading...</span>
      <span class="header__count" aria-label="Количество товаров" v-else>{{ $store.state.cartProductsData.length }}</span>
    </div>
  </router-link>
</template>

<script>
  export default {

};
</script>

<style>
  .header__cart {
    cursor: pointer;
  }
</style>
