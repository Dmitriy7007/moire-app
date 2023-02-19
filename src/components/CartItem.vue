<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.color.gallery[0].file.url"
        width="120"
        height="120"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <div class="product__info product__info--color">
      Цвет:
      <span class="product__color">
        <i :style="{ backgroundColor: item.color.color.code }"></i>
        {{ item.color.color.title }}
      </span>
      <div class="product__info">Размер: {{ item.size.title }}</div>
    </div>

    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="deleteProduct">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="number" v-model.number="amount" name="count" />

      <button type="button" aria-label="Добавить один товар" @click.prevent="addProduct">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price"> {{ itemPricePretty }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteCartProduct(item.id)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import { mapActions } from "vuex";

export default {
  props: ["item"],
  computed: {
    itemPricePretty() {
      return numberFormat(this.item.price);
    },
    amount: {
      get() {
        return this.item.quantity;
      },
      set(value) {
        this.updateCartProductAmount({ basketItemId: this.item.id, quantity: value });
      },
    },
  },
  methods: {
    ...mapActions(["deleteCartProduct", "updateCartProductAmount"]),
    addProduct() {
      this.amount += 1;
    },
    deleteProduct() {
      if (this.amount > 1) {
        this.amount -= 1;
      }
    },
  },
};
</script>

<style>
.button-del {
  cursor: pointer;
}
.product__color {
  margin-bottom: 20px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
