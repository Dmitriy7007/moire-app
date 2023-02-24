<template>
  <li class="radio-list__item">
    <label class="radio-list__label">
      <input
        class="check-list__check sr-only"
        type="radio"
        name="productInPage"
        :value="item.products"
        v-model="currentProductPage"
      />
      <span class="check-list__desc radio-list__desc">
        {{ item.products }}
      </span>
    </label>
  </li>
</template>
<script>
export default {
  props: ["item", "value"],
  computed: {
    currentProductPage: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style>
.radio-list__item {
  display: inline-block;
}
.radio-list__label {
  cursor: pointer;
  display: inline-block;
}
</style>
