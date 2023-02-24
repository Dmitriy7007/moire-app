<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> {{ totalProducts }} {{ productWord }} </span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter />

      <section class="catalog">
        <div v-if="productsLoading">
          <svg
            xmlns:svg="http://www.w3.org/2000/svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.0"
            width="256px"
            height="64px"
            viewBox="0 0 128 32"
            xml:space="preserve"
            style="margin: auto; display: flex; margin-bottom: 30px"
          >
            <circle fill="#e02d71" cx="0" cy="0" r="11" transform="translate(16 16)">
              <animateTransform
                attributeName="transform"
                type="scale"
                additive="sum"
                values="1;1.42;1;1;1;1;1;1;1;1"
                dur="900ms"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
            <circle fill="#e02d71" cx="0" cy="0" r="11" transform="translate(64 16)">
              <animateTransform
                attributeName="transform"
                type="scale"
                additive="sum"
                values="1;1;1;1;1.42;1;1;1;1;1"
                dur="900ms"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
            <circle fill="#e02d71" cx="0" cy="0" r="11" transform="translate(112 16)">
              <animateTransform
                attributeName="transform"
                type="scale"
                additive="sum"
                values="1;1;1;1;1;1;1;1.42;1;1"
                dur="900ms"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
          </svg>
          <div style="text-align: center">Загрузка товаров...</div>
        </div>
        <div v-if="productsLoadingFailed" style="text-align: center">
          Произошла ошибка при загрузке товаров<br />
          <button
            class="cart__button button button--primery"
            style="width: 50%"
            @click.prevent="loadProducts()"
          >
            Попробовать еще раз
          </button>
        </div>

        <ProductList />

        <div style="text-align: center; margin-bottom: 30px">
          <div style="margin-bottom: 10px">
            Изменить количество товаров отоброжаемых на странице:
          </div>
          <ul class="check-list">
            <BaseProductsInPage
              v-for="item in productsPerPage"
              :key="item.id"
              :item="item"
              v-model="currentProductsPerPage"
            />
          </ul>
        </div>

        <BasePagination />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/Base/BasePagination.vue";
import BaseProductsInPage from "@/components/Base/BaseProductsInPage.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import productWord from "@/helpers/productWord";
import { mapActions, mapMutations } from "vuex";

export default {
  components: { ProductList, BasePagination, ProductFilter, BaseProductsInPage },
  data() {
    return {
      productsPerPage: [
        { products: 12, id: 1 },
        { products: 24, id: 2 },
        { products: 32, id: 3 },
      ],
      currentProductsPerPage: this.$store.state.productsPerPage,
    };
  },
  computed: {
    totalProducts() {
      return this.$store.state.productsPagination.total;
    },
    productWord() {
      return productWord(this.totalProducts);
    },
    productsLoading() {
      return this.$store.state.productsLoading;
    },
    productsLoadingFailed() {
      return this.$store.state.productsLoadingFailed;
    },
  },
  methods: {
    ...mapActions(["loadProducts", "loadCategories", "loadColors", "loadMaterials", "loadSeasons"]),
    ...mapMutations(["updateproductsPerPage"]),
  },
  created() {
    this.loadProducts();
    this.loadCategories();
    this.loadColors();
    this.loadMaterials();
    this.loadSeasons();
  },
  watch: {
    currentProductsPerPage(value) {
      this.updateproductsPerPage(value);
      this.loadProducts();
    },
  },
};
</script>

<style>
.radio-list__item:not(:last-child) {
  margin-right: 30px;
}
</style>
