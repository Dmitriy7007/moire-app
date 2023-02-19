import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productItems: [],
    productsPagination: {},
    productsLoading: false,
    productsLoadingFailed: false,

    filterPriceFrom: 0,
    filterPriceTo: 0,
    filterCategoryId: 0,
    filterMaterialIds: [],
    filterSeasonIds: [],
    filterColorIds: [],

    productsPerPage: 12,
    page: 1,

    categoriesData: [],
    materialsData: [],
    seasonsData: [],
    colorData: [],

    productLoading: false,
    productLoadingFailed: false,
    productData: null,

    productAdded: false,
    productAddSending: false,
    cartProductsData: [],

    userAccessKey: null,
    cartLoading: false,
    cartLoadingFailed: false,

    orderId: null,
    orderLoading: false,
    orderLoadingFailed: false,
    orderSending: false,
    orderInfoBlock: [],
    orderInfo: null,
    payments: [],
    deliveries: [],
  },

  mutations: {
    updateProductsLoading(state, status) {
      state.productsLoading = status;
    },
    updateProductsLoadingFailed(state, status) {
      state.productsLoadingFailed = status;
    },
    updateProductItems(state, items) {
      state.productItems = items;
    },
    updateProductsPagination(state, pagination) {
      state.productsPagination = pagination;
    },
    updateCategoriesData(state, items) {
      state.categoriesData = items;
    },
    updateMaterialsData(state, items) {
      state.materialsData = items;
    },
    updateSeasonsData(state, items) {
      state.seasonsData = items;
    },
    updateColorData(state, items) {
      state.colorData = items;
    },
    updateFilterPriceFrom(state, price) {
      state.filterPriceFrom = price;
    },
    updateFilterPriceTo(state, price) {
      state.filterPriceTo = price;
    },
    updateFilterCategoryId(state, id) {
      state.filterCategoryId = id;
    },
    updateFilterMaterialIds(state, ids) {
      state.filterMaterialIds = ids;
    },
    updateFilterSeasonIds(state, ids) {
      state.filterSeasonIds = ids;
    },
    updateFilterColorIds(state, ids) {
      state.filterColorIds = ids;
    },
    updatePage(state, page) {
      state.page = page;
    },
    updateProductLoading(state, status) {
      state.productLoading = status;
    },
    updateProductLoadingFailed(state, status) {
      state.productLoadingFailed = status;
    },
    updateProductData(state, data) {
      state.productData = data;
    },
    updateProductAdded(state, status) {
      state.productAdded = status;
    },
    updateProductAddSending(state, status) {
      state.productAddSending = status;
    },
    updateCartProductsData(state, item) {
      state.cartProductsData = item;
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartLoading(state, status) {
      state.cartLoading = status;
    },
    updateCartLoadingFailed(state, status) {
      state.cartLoadingFailed = status;
    },
    updateCartProductAmount(state, { basketItemId, quantity }) {
      const item = state.cartProductsData.find((item) => item.id === basketItemId);

      if (item) {
        item.quantity = quantity;
      }
    },
    deleteCartProduct(state, basketItemId) {
      state.cartProductsData = state.cartProductsData.filter((item) => item.id !== basketItemId);
    },
    resetCart(state) {
      state.cartProductsData = [];
    },
    updateOrderSending(state, status) {
      state.orderSending = status;
    },
    updateOrderId(state, id) {
      state.orderId = id;
    },
    updateOrderLoading(state, status) {
      state.orderLoading = status;
    },
    updateOrderLoadingFailed(state, status) {
      state.orderLoadingFailed = status;
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    updateOrderInfoBlock(state) {
      state.orderInfoBlock = [...state.cartProductsData].map((item) => ({
        ...item,
        amount: item.quantity,
      }));
    },
    updatePayments(state, id) {
      state.payments = id;
    },
    updateDeliveries(state, id) {
      state.deliveries = id;
    },
    updateproductsPerPage(state, value) {
      state.productsPerPage = value
    }
  },
  getters: {
    cartTotalPrice(state) {
      return state.cartProductsData.reduce((acc, item) => (item.price * item.quantity) + acc, 0);
    },
    quantityProduct(state) {
      return state.cartProductsData.length
    }
  },
  actions: {
    loadProducts(context) {
      context.commit('updateProductsLoading', true);
      context.commit('updateProductsLoadingFailed', false);
      return (new Promise((resolve) => setTimeout(resolve, 0)))
      .then(() => axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              categoryId: context.state.filterCategoryId,
              materialIds: context.state.filterMaterialIds,
              seasonIds: context.state.filterSeasonIds,
              colorIds: context.state.filterColorIds,
              page: context.state.page,
              limit: context.state.productsPerPage,
              minPrice: context.state.filterPriceFrom,
              maxPrice: context.state.filterPriceTo,
            },
          })
          .then((response) => {
            context.commit('updateProductItems', response.data.items);
            context.commit('updateProductsPagination', response.data.pagination);
          })
          .catch(() => context.commit('updateProductsLoadingFailed', true))
          .then(() => context.commit('updateProductsLoading', false))
      )
    },
    loadCategories(context) {
      axios.get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => context.commit('updateCategoriesData', response.data.items))
      },
    loadColors(context) {
      axios.get(`${API_BASE_URL}/api/colors`)
        .then((response) => context.commit('updateColorData', response.data.items))
    },
    loadMaterials(context) {
      axios.get(`${API_BASE_URL}/api/materials`)
        .then((response) => context.commit('updateMaterialsData', response.data.items))
    },
    loadSeasons(context) {
      axios.get(`${API_BASE_URL}/api/seasons`)
        .then((response) => context.commit('updateSeasonsData', response.data.items))
    },
    loadProduct(context, paramId) {
      context.commit('updateProductLoading', true);
      context.commit('updateProductLoadingFailed', false);
      return (new Promise((resolve) => setTimeout(resolve, 0)))
      .then(() => axios
        .get(`${API_BASE_URL}/api/products/${paramId}`)
          .then((response) => context.commit('updateProductData', response.data))
          .catch(() => context.commit('updateProductLoadingFailed', true))
          .then(() => context.commit('updateProductLoading', false))
        )
    },
    addProductToCart(context, { productId, colorId, sizeId, quantity }) {
      context.commit('updateProductAdded', false);
      context.commit('updateProductAddSending', true);
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        .then(() => axios
          .post(`${API_BASE_URL}/api/baskets/products`, {
            productId,
            colorId,
            sizeId,
            quantity,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            context.commit('updateCartProductsData', response.data.items);
          }))
          .then(() => {
            context.commit('updateProductAdded', true);
            setTimeout(() => {context.commit('updateProductAdded', false)}, 1500);
            context.commit('updateProductAddSending', false)
        }
      )
    },
    loadCart(context) {
      context.commit('updateCartLoading', true);
      context.commit('updateCartLoadingFailed', false);
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        .then(() => axios
          .get(`${API_BASE_URL}/api/baskets`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            if (!context.state.userAccessKey) {
              localStorage.setItem('userAccessKey', response.data.user.accessKey);
              context.commit('updateUserAccessKey', response.data.user.accessKey);
            }
            context.commit('updateCartProductsData', response.data.items);
          })
          .catch(() => context.commit('updateCartLoadingFailed', true))
          .then(() => context.commit('updateCartLoading', false))
      )
    },
    updateCartProductAmount(context, { basketItemId, quantity }) {
      context.commit('updateCartProductAmount', { basketItemId, quantity });

      if (quantity < 1) { return }

      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          basketItemId,
          quantity,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
    },
    deleteCartProduct(context, basketItemId) {
      context.commit('deleteCartProduct', basketItemId);

      return axios
        .delete(`${API_BASE_URL}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`, {
          data: { basketItemId },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        });
    },
    loadOrder(context, dataForm) {
      context.commit('updateOrderSending', true);
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        .then(() => axios
          .post(`${API_BASE_URL}/api/orders`, {
            ...dataForm,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            context.commit('updateOrderInfoBlock');
            context.commit('resetCart');
            context.commit('updateOrderInfo', response.data);
            context.commit('updateOrderId', response.data.id);
            context.commit('updateOrderSending', false);
          })
      )
    },
    loadOrderInfo(context, orderId) {
      context.commit('updateOrderLoading', true);
      context.commit('updateOrderLoadingFailed', false);
      return (new Promise((resolve) => setTimeout(resolve, 2000)))
        .then(() => axios
          .get(`${API_BASE_URL}/api/orders/${orderId}`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            context.commit('updateOrderInfo', response.data);
          })
          .catch(() => context.commit('updateOrderLoadingFailed', true))
          .then(() => context.commit('updateOrderLoading', false))
      )
    },
    loadPayments(context) {
      return axios
      .get(`${API_BASE_URL}/api/payments/`, {
        params: {deliveryTypeId: 1},
      })
      .then((response) =>
        context.commit('updatePayments', response.data)
      );
    },
    loadDeliveries(context) {
      return axios
      .get(`${API_BASE_URL}/api/deliveries/`)
      .then((response) =>
        context.commit('updateDeliveries', response.data)
      );
    },
  }
});
