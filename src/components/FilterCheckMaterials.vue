<template>
  <li class="check-list__item">
    <label class="check-list__label">
      <input class="check-list__check sr-only" type="checkbox" name="material" :value="materialCheckbox.id" v-model="currentMaterials">
      <span class="check-list__desc">
        {{materialCheckbox.title}}
        <span>({{materialCheckbox.productsCount}})</span>
      </span>
    </label>
  </li>
</template>

<script>
  export default {
    props: ['materialCheckbox', 'value'],
    computed: {
      currentMaterials: {
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
