<template>
    <li class="options__item">
      <label class="options__label">
        <input class="options__radio sr-only" type="radio" name="payments" :value="item.id" v-model.number="currentPayments">
        <span class="options__value">
          {{item.title}}
        </span>
      </label>
    </li>
  </template>

  <script>
    export default {
      props: ['item', 'value'],
      computed: {
        currentPayments: {
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
