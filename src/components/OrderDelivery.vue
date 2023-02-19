<template>
  <li class="options__item">
    <label class="options__label">
      <input class="options__radio sr-only" type="radio" name="delivery" :value="item.id" v-model.number="currentDelivery">
      <span class="options__value">
        {{item.title}} <b>{{pricePretty}}</b>
      </span>
    </label>
  </li>
</template>

<script>
  export default {
    props: ['item', 'value'],
    computed: {
      currentDelivery: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value);
        },
      },
      pricePretty() {
        return Number(this.item.price) > 0 ? '290 ₽' : 'бесплатно'
      },
    },
  }
</script>
