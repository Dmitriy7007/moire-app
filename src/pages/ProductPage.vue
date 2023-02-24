<template>
  <main class="content container" v-if="productLoading">Загрузка товара...</main>
  <main class="content container" v-else-if="productLoadingFailed" style="text-align: center">
    Не удалось загрузить товар<br />
    <button
      class="cart__button button button--primery"
      style="width: 30%"
      @click.prevent="loadProduct()"
    >
      Попробовать еще раз
    </button>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            v-slot="{ navigate, href }"
            custom
            class="breadcrumbs__link breadcrumbs-link"
            to="/"
            tag="span"
          >
            <span :href="href" @click="navigate" @keypress.enter="navigate" role="link"
              >Каталог</span
            >
          </router-link>
        </li>

        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link breadcrumbs-link" @click.prevent="getBreadcrumbs">
            {{ product.category.title }}
          </a>
        </li>

        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="currentImageItem" :alt="product.title" />
        </div>
        <ul class="pics__list">
          <ProductItemImg
            v-for="color in product.colors"
            :key="color.id"
            :color="color"
            :currentColorId="currentColorId"
          />
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click.prevent="deleteProduct">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="number" v-model.number="productAmount" name="count" />

                <button type="button" aria-label="Добавить один товар" @click.prevent="addProduct">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price"> {{ productPricePretty }} ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <ProductColor
                    v-for="color in productColors"
                    :key="color.id"
                    :color-item="color"
                    :id="product.id"
                    v-model="currentColorItem"
                  />
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select
                    class="form__select"
                    type="text"
                    name="category"
                    v-model.number="currentProductSizeId"
                  >
                    <BaseSelectOption
                      v-for="option in product.sizes"
                      :key="option.id"
                      :option-select="option"
                    />
                  </select>
                </label>
              </fieldset>
            </div>

            <button
              class="item__button button button--primery"
              style="max-height: 66.9px"
              type="submit"
            >
              В корзину
              <div v-show="productAdded" style="font-size: 8px">Товар добавлен в корзину</div>
              <div v-show="productAddSending" style="font-size: 8px">
                Добавляем товар в корзину...
              </div>
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a
              class="tabs__link"
              :class="{
                'tabs__link--current': productInfo === true,
                'tabs-link': productInfo === false,
              }"
              @click.prevent="changedInfo"
            >
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              :class="{
                'tabs__link--current': productInfoDelivery === true,
                'tabs-link': productInfoDelivery === false,
              }"
              @click.prevent="changedInfo"
            >
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content" v-show="productInfo">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br />
            30% полиэстер<br />
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br />
            Гладить при макс. 110ºC<br />
            Не использовать машинную сушку<br />
            Отбеливать запрещено<br />
            Не подвергать химчистке<br />
          </p>
        </div>

        <div class="item__content" v-show="productInfoDelivery">
          <h3>Доставка:</h3>

          <p>
            1. Курьерская доставка по Москве и Московской области – 290 ₽ <br />
            2. Самовывоз из магазина. Список и адреса магазинов Вы можете посмотреть
            <a href="#" class="link-mini">здесь</a>
          </p>

          <h3>Возврат:</h3>

          <p>
            Любой возврат должен быть осуществлен в течение 30 дней с момента отгрузки. Возвраты в
            магазине БЕСПЛАТНО.<br />
            Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в
            которой Вы осуществили покупку.<br />
            БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.<br />
            Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по
            телефону 8 800 600 90 09
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import numberFormat from "@/helpers/numberFormat";
import ProductColor from "@/components/ProductColor.vue";
import ProductItemImg from "@/components/ProductItemImg.vue";
import BaseSelectOption from "@/components/Base/BaseSelectOption.vue";

export default {
  components: { ProductColor, BaseSelectOption, ProductItemImg },
  data() {
    return {
      currentColorItem: "",
      productAmount: 1,
      productInfo: true,
      productInfoDelivery: false,
      currentProductSizeId: "",
    };
  },
  computed: {
    product() {
      return this.$store.state.productData;
    },
    productPricePretty() {
      return numberFormat(this.product.price * this.productAmount);
    },
    productColors() {
      return this.$store.state.productData.colors;
    },
    productLoading() {
      return this.$store.state.productLoading;
    },
    productLoadingFailed() {
      return this.$store.state.productLoadingFailed;
    },
    currentImageItem() {
      return this.currentColorItem
        ? this.product.colors.find((el) => el.color.code == this.currentColorItem).gallery[0].file
            .url
        : "";
    },
    currentColorId() {
      return this.currentColorItem
        ? this.product.colors.find((el) => el.color.code == this.currentColorItem).color.id
        : "";
    },
    productAdded() {
      return this.$store.state.productAdded;
    },
    productAddSending() {
      return this.$store.state.productAddSending;
    },
  },
  methods: {
    ...mapMutations(["updateFilterCategoryId"]),
    ...mapActions(["loadProduct", "addProductToCart", "loadProducts"]),
    getBreadcrumbs() {
      this.$router.push({ name: "main" });
      this.updateFilterCategoryId(this.product.category.id);
      this.loadProducts();
    },
    changedInfo() {
      this.productInfo = this.productInfo ? false : true;
      this.productInfoDelivery = this.productInfoDelivery ? false : true;
    },
    addProduct() {
      this.productAmount += 1;
    },
    deleteProduct() {
      if (this.productAmount > 1) {
        this.productAmount -= 1;
      }
    },
    addToCart() {
      this.addProductToCart({
        productId: this.product.id,
        colorId: this.currentColorId,
        sizeId: this.currentProductSizeId,
        quantity: this.productAmount,
      });
    },
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.loadProduct(this.$route.params.id).then(() => {
          this.currentColorItem = this.$store.state.productData.colors[0].color.code;
          this.currentProductSizeId = this.$store.state.productData.sizes[0].id;
        });
      },
      immediate: true,
    },
  },
};
</script>

<style>
.tabs-link {
  cursor: pointer;
}
.tabs__link--current {
  pointer-events: none;
}
.item__content .link-mini {
  border-bottom: 1px solid #e02d71;
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
