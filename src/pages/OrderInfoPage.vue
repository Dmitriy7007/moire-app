<template>
  <main class="content container" v-if="$store.state.orderLoading">
    <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="256px" height="64px" viewBox="0 0 128 32" xml:space="preserve" style="margin: auto; display: flex; margin-bottom: 30px">
      <circle fill="#e02d71" cx="0" cy="0" r="11" transform="translate(16 16)">
        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1.42;1;1;1;1;1;1;1;1" dur="900ms" repeatCount="indefinite"></animateTransform></circle><circle fill="#e02d71" cx="0" cy="0" r="11" transform="translate(64 16)">
        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1.42;1;1;1;1;1" dur="900ms" repeatCount="indefinite"></animateTransform></circle><circle fill="#e02d71" cx="0" cy="0" r="11" transform="translate(112 16)">
        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1;1;1;1.42;1;1" dur="900ms" repeatCount="indefinite"></animateTransform>
      </circle>
    </svg>
    <div style="text-align: center">Загрузка информации о заказе...</div>
  </main>
  <main class="content container" v-else-if="$store.state.orderLoadingFailed" style="text-align: center">Не удалось загрузить информацию о заказе<br>
    <button class="cart__button button button--primery" style="width: 30%" @click.prevent="loadOrderInfo($route.params.id)">Попробовать еще раз</button>
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
          <router-link v-slot="{ navigate, href }" custom class="breadcrumbs__link breadcrumbs-link" to="/cart" tag="span">
            <span :href="href" @click="navigate" @keypress.enter="navigate" role="link">Корзина</span>
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{orderInfoPage.id}}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{orderInfoPage.name}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{orderInfoPage.address}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{orderInfoPage.phone}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{orderInfoPage.email}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{orderInfoPage.paymentType}}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderInfoItem v-for="item in  orderInfoPage.basket.items" :key="item.id" :item="item"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{delivery}}</b></p>
            <p>Итого: <b>{{orderInfoPage.basket.items.length}}</b> {{productWord}} на сумму <b>{{pricePretty}} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
  import numberFormat from '@/helpers/numberFormat';
  import productWord from '@/helpers/productWord';
  import OrderInfoItem from '@/components/OrderInfoItem.vue';
  import { mapActions } from 'vuex';
  export default {
    components: {OrderInfoItem},
    computed: {
      orderInfoPage() {
        return this.$store.state.orderInfo
      },
      pricePretty() {
        return numberFormat(this.orderInfoPage.totalPrice)
      },
      productWord() {
        return productWord(this.orderInfoPage.basket.items.length);
      },
      delivery() {
        return this.orderInfoPage.deliveryType.id == 1 ? 'бесплатно' : '290 ₽'
      }
    },
    methods: {
      ...mapActions(['loadOrderInfo'])
    },
    created() {
      if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
        return;
      }
      this.loadOrderInfo(this.$route.params.id);
    },
  }
</script>
