<template>
  <main class="content container" v-if="$store.state.cartLoading">
    <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="256px" height="64px" viewBox="0 0 128 32" xml:space="preserve" style="margin: auto; display: flex; margin-bottom: 30px">
      <circle fill="#e02d71" cx="0" cy="0" r="11" transform="translate(16 16)">
        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1.42;1;1;1;1;1;1;1;1" dur="900ms" repeatCount="indefinite"></animateTransform></circle><circle fill="#e02d71" cx="0" cy="0" r="11" transform="translate(64 16)">
        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1.42;1;1;1;1;1" dur="900ms" repeatCount="indefinite"></animateTransform></circle><circle fill="#e02d71" cx="0" cy="0" r="11" transform="translate(112 16)">
        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1;1;1;1.42;1;1" dur="900ms" repeatCount="indefinite"></animateTransform>
      </circle>
    </svg>
    <div style="text-align: center">Загрузка корзины...</div>
  </main>
  <main class="content container" v-else-if="$store.state.cartLoadingFailed" style="text-align: center">Не удалось загрузить корзину товаров<br>
    <button class="cart__button button button--primery" style="width: 30%" @click.prevent="cartLoad()">Попробовать еще раз</button>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link v-slot="{ navigate, href }" custom class="breadcrumbs__link breadcrumbs-link" to="/" tag="span">
            <span :href="href" @click="navigate" @keypress.enter="navigate" role="link">Каталог</span>
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{quantityProduct}} {{productWord}}
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in cartProducts" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{totalPricePretty}} ₽</span>
          </p>

          <router-link v-slot="{ navigate, href }" custom class="cart__button button button--primery" type="submit" v-if="productAvailability" to="/order" tag="button">
            <button :href="href" @click="navigate" @keypress.enter="navigate" role="link">
              Оформить заказ
            </button>
          </router-link>
          <button class="cart__button button button--primery" v-else disabled tag="button">
            Оформить заказ
          </button>

        </div>
      </form>
    </section>
  </main>
</template>

<script>
  import numberFormat from '@/helpers/numberFormat';
  import productWord from '@/helpers/productWord';
  import { mapGetters } from 'vuex';
  import CartItem from '@/components/CartItem.vue';

  export default {
    data() {
      return {

      }
    },
    components: { CartItem },
    computed: {
      ...mapGetters(['cartTotalPrice', 'quantityProduct']),
      cartProducts() {
        return this.$store.state.cartProductsData
      },
      productWord() {
        return productWord(this.quantityProduct);
      },
      totalPricePretty() {
        return numberFormat(this.cartTotalPrice)
      },
      productAvailability() {
        return this.quantityProduct > 0;
      },
    },
    methods: {
      cartLoad() {
        this.$store.dispatch('loadCart');
      },
    },
  };
</script>
