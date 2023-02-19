<template>
  <li class="colors__item">
    <label class="colors__label">
      <input class="colors__radio sr-only" type="radio" :name="id" :value="colorItem.color.code" v-model="currentColorProduct">
      <span class="colors__value" :style="{backgroundColor: colorItem.color.code}">
      </span>
    </label>
  </li>
</template>

<script>
  export default {
    props: ['colorItem', 'id', 'value'],
    computed: {
      currentColorProduct: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value);
        },
      },
    }
  }
</script>
