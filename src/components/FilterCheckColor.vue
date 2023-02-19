<template>
  <li class="colors__item">
    <label class="colors__label">
      <input class="colors__checkbox sr-only" type="checkbox" name="colorCheckbox" :value="colorCheckbox.id" v-model="currentColor"/>
      <span class="colors__value" :style="{backgroundColor: colorCheckbox.code}"></span>
    </label>
  </li>
</template>

<script>
  export default {
    props: ['colorCheckbox', 'value'],
    computed: {
      currentColor: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
    },
  }
</script>

<style>
  .colors__checkbox:checked~.colors__value::before {
    border-color: black;}
</style>
