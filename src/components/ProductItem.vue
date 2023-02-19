<template>
  <li class="catalog__item" style="position: relative;">

    <router-link :to="{name: 'product', params: {id: product.id}}" v-slot="{ navigate, href }" class="catalog__pic" custom>
      <img :href="href" @click="navigate" @keypress.enter="navigate" role="link" :src="currentImageItem" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      {{product.title}}
    </h3>

    <span class="catalog__price">
      {{productPricePretty}} ₽
    </span>

    <ul class="colors colors--black" style="margin-bottom: 90px">
     <ProductColor v-for="color in productColors" :key="color.id" :color-item="color" :id="product.id" v-model="currentColorItem"/>
    </ul>

    <button class="item__button button button--primery" style="max-height: 66.9px; position: absolute; bottom: 0;" @click.prevent="addToCart" >
      <div style="display: flex; justify-content: center;">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="16.9px" height="16.9px" viewBox="0 0 533.334 533.335" style="enable-background:new 0 0 533.334 533.335; fill: #fff; margin-right: 10px;"
        xml:space="preserve">
          <g>
            <path d="M441.26,300.001c18.333,0,37.454-14.423,42.49-32.052l48.353-169.231c5.036-17.627-5.844-32.05-24.177-32.05H166.667
              c0-36.819-29.848-66.667-66.667-66.667H0v66.667h100v283.333c0,27.614,22.386,50,50,50h316.667
              c18.409,0,33.334-14.924,33.334-33.333s-14.925-33.334-33.334-33.334h-300v-33.333H441.26z M166.667,133.334h301.461l-28.573,100
              H166.667V133.334z M200,491.668c0,22.916-18.75,41.666-41.667,41.666h-16.667c-22.917,0-41.667-18.75-41.667-41.666v-16.667
              c0-22.917,18.75-41.667,41.667-41.667h16.667c22.917,0,41.667,18.75,41.667,41.667V491.668z M500,491.668
              c0,22.916-18.75,41.666-41.667,41.666h-16.667c-22.916,0-41.666-18.75-41.666-41.666v-16.667c0-22.917,18.75-41.667,41.666-41.667
              h16.667c22.917,0,41.667,18.75,41.667,41.667V491.668z"/>
          </g>
        </svg>
        <span>В корзину</span>
      </div>
      <div style="font-size: 8px">Товар добавлен в корзину</div>
    </button>

    <button class="item__button button button--primery" style="max-height: 66.9px; position: absolute; bottom: 0;" @click.prevent="addToCart" >
      <div style="display: flex; justify-content: center;">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="16.9px" height="16.9px" viewBox="0 0 533.334 533.335" style="enable-background:new 0 0 533.334 533.335; fill: #fff; margin-right: 10px;"
        xml:space="preserve">
          <g>
            <path d="M441.26,300.001c18.333,0,37.454-14.423,42.49-32.052l48.353-169.231c5.036-17.627-5.844-32.05-24.177-32.05H166.667
              c0-36.819-29.848-66.667-66.667-66.667H0v66.667h100v283.333c0,27.614,22.386,50,50,50h316.667
              c18.409,0,33.334-14.924,33.334-33.333s-14.925-33.334-33.334-33.334h-300v-33.333H441.26z M166.667,133.334h301.461l-28.573,100
              H166.667V133.334z M200,491.668c0,22.916-18.75,41.666-41.667,41.666h-16.667c-22.917,0-41.667-18.75-41.667-41.666v-16.667
              c0-22.917,18.75-41.667,41.667-41.667h16.667c22.917,0,41.667,18.75,41.667,41.667V491.668z M500,491.668
              c0,22.916-18.75,41.666-41.667,41.666h-16.667c-22.916,0-41.666-18.75-41.666-41.666v-16.667c0-22.917,18.75-41.667,41.666-41.667
              h16.667c22.917,0,41.667,18.75,41.667,41.667V491.668z"/>
          </g>
        </svg>
        <span>В корзину</span>
      </div>
    </button>
  </li>
</template>

<script>
  import ProductColor from './ProductColor.vue';
  import numberFormat from '@/helpers/numberFormat'
  import { mapActions } from 'vuex';
  import axios from 'axios';
  import { API_BASE_URL } from '../config';

  export default {
    components: {ProductColor},
    props: ['product'],
    data() {
      return {
        currentColorItem: this.product.colors.map((item) => item.color.code)[0],
      }
    },
    methods: {
      ...mapActions(['addProductToCart', 'loadProduct']),
      productData(id) {
        return axios.get(`${API_BASE_URL}/api/products/${id}`)
          .then(response => response.data)
      },
      addToCart(event) {
        if (event) {
          let btn = event.currentTarget
          btn.style.visibility = 'hidden'
          setTimeout(() => {
            btn.style.visibility = 'visible'
          }, 1000)
        }
        this.loadProduct(this.product.id)
          .then(() => {
            this.addProductToCart({
            productId: this.product.id,
            colorId: this.colorId,
            sizeId: this.$store.state.productData.sizes[0].id,
            quantity: 1,
          })
        })
      },
    },
    computed: {
      productPricePretty() {
        return numberFormat(this.product.price)
      },
      productColors() {
        return this.product.colors
      },
      currentImageItem() {
        if (this.product.colors.find((el) => el.color.code == this.currentColorItem).gallery == null) {
          return 'https://a.lmcdn.ru/pi/img600x866/M/P/MP002XC00NCX_12493481_1_v1.jpg'
        }
        return this.product.colors.find((el) => el.color.code == this.currentColorItem).gallery[0].file.url
      },
      button() {
        return document.querySelectorAll('.item__button')[0]
      },
      productAdded() {
        return this.$store.state.productAdded
      },
      colorId() {
        return this.productColors.find(item => item.color.code == this.currentColorItem).color.id
      }
    },
  }
</script>

<style>
  .catalog__pic {
    cursor: pointer;
  }
  .btnNone {
    display: none;
  }
</style>
