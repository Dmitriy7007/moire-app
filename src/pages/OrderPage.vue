<template>
  <main class="content container" v-if="$store.state.cartLoading">
    <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="256px" height="64px" viewBox="0 0 128 32" xml:space="preserve" style="margin: auto; display: flex; margin-bottom: 30px">
      <circle fill="#e02d71" cx="0" cy="0" r="11" transform="translate(16 16)">
        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1.42;1;1;1;1;1;1;1;1" dur="900ms" repeatCount="indefinite"></animateTransform></circle><circle fill="#e02d71" cx="0" cy="0" r="11" transform="translate(64 16)">
        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1.42;1;1;1;1;1" dur="900ms" repeatCount="indefinite"></animateTransform></circle><circle fill="#e02d71" cx="0" cy="0" r="11" transform="translate(112 16)">
        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1;1;1;1.42;1;1" dur="900ms" repeatCount="indefinite"></animateTransform>
      </circle>
    </svg>
    <div style="text-align: center">Загрузка страницы оформления заказа...</div>
  </main>
  <main class="content container" v-else-if="$store.state.cartLoadingFailed" style="text-align: center">Не удалось загрузить страницу оформления заказа<br>
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

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" title="ФИО" placeholder="Введите ваше полное имя" :error="formError.name" />

            <BaseFormText v-model="formData.address" title="Адрес доставки" placeholder="Введите ваш адрес" :error="formError.address" />

            <BaseFormText v-model="formData.phone" title="Телефон" placeholder="Введите ваш телефон" :error="formError.phone" type="tel" />

            <BaseFormText v-model="formData.email" title="Email" placeholder="Введи ваш Email" :error="formError.email" type="email" />

            <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу" placeholder="Ваши пожелания" :error="formError.comment" />
          </div>

          <div class="cart__options">
            <div class="form-error" v-if="formError.deliveryTypeId">{{formError.deliveryTypeId}}</div>
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <OrderDelivery v-for="item in deliveries" :key="item.id" :item="item" v-model="deliveryTypeId"/>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <OrderPayments v-for="item in payments" :key="item.id" :item="item" v-model="paymentTypeId"/>
            </ul>
          </div>
        </div>

        <OrderCartBlock :deliveries="deliveries" :delivery-type-id="deliveryTypeId"/>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>{{ formErrorMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
  import BaseFormText from '@/components/BaseFormText.vue';
  import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
  import OrderCartBlock from '@/components/OrderCartBlock.vue';
  import OrderDelivery from '@/components/OrderDelivery.vue';
  import OrderPayments from '@/components/OrderPayments.vue';
  import { mapActions} from 'vuex';

  export default {
    components: {BaseFormText, BaseFormTextarea, OrderCartBlock, OrderDelivery, OrderPayments},
    data() {
      return {
        deliveryTypeId: 0,
        paymentTypeId: 0,
        formData: {},
        formError: {},
        formErrorMessage: '',
      };
    },
    methods: {
      ...mapActions(['loadOrder', 'loadPayments', 'loadDeliveries']),
      order() {
        this.formError = {};
        this.formErrorMessage = '';
        this.formData.deliveryTypeId = this.deliveryTypeId;
        this.formData.paymentTypeId = this.paymentTypeId;
        this.loadOrder(this.formData)
          .then(() => {
            this.$router.push(
              { name: 'orderInfo', params: { id: this.$store.state.orderId } },
            );
          })
          .catch((error) => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
            this.$store.commit('updateOrderSending', false);
          });
      },
    },
    computed: {
      payments() {
        return this.$store.state.payments
      },
      deliveries() {
        return this.$store.state.deliveries
      },
    },
    created() {
      this.loadDeliveries();
      this.loadPayments()
    }
  }
</script>

<style>
  .breadcrumbs-link {
    cursor: pointer;
  }
  .form-error {
    font-size: 11px;
    line-height: 14px;
    color: #e02d71;
    margin-bottom: 30px;
  }
</style>
