<template>
  <li class="check-list__item">
    <label class="check-list__label">
      <input class="check-list__check sr-only" type="checkbox" name="collection" :value="seasonCheckbox.id" v-model="currentSeason">
      <span class="check-list__desc">
        {{seasonCheckbox.title}}
        <span>({{seasonCheckbox.productsCount}})</span>
      </span>
    </label>
  </li>
</template>

<script>
  export default {
    props: ['seasonCheckbox', 'value'],
    computed: {
      currentSeason: {
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
