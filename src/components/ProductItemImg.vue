<template>
  <li class="pics__item">
    <a class="pics__link" :class="{ 'pics__link--current': currentColorId == color.color.id }">
      <img
        width="98"
        height="98"
        :src="color.gallery[0].file.url"
        alt="Картинка товара"
        class="img__product-color"
      />
    </a>
  </li>
</template>

<script>
export default {
  props: ["color", "currentColorId"],
};
</script>

<style>
.img__product-color {
  height: 98px;
}
</style>
