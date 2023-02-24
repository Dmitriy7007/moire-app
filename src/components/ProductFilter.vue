<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo" />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model.number="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <BaseSelectOption
              v-for="option in categoriesData"
              :key="option.id"
              :option-select="option"
            />
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <FilterCheckColor
            v-for="color in colorData"
            :key="color.id"
            :color-checkbox="color"
            v-model="currentColorIds"
          />
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <FilterCheckMaterials
            v-for="material in materialsData"
            :key="material.id"
            :material-checkbox="material"
            v-model="currentMaterialIds"
          />
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <FilterCheckSeason
            v-for="season in seasonsData"
            :key="season.id"
            :season-checkbox="season"
            v-model="currentSeasonIds"
          />
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit" v-show="isDisabled">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset"
        v-show="isDisabled"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import BaseSelectOption from "./Base/BaseSelectOption.vue";
import FilterCheckMaterials from "./FilterCheckMaterials.vue";
import FilterCheckSeason from "./FilterCheckSeason.vue";
import FilterCheckColor from "./FilterCheckColor.vue";
import { mapMutations, mapActions } from "vuex";

export default {
  components: { BaseSelectOption, FilterCheckMaterials, FilterCheckSeason, FilterCheckColor },
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: this.$store.state.filterCategoryId || 0,
      currentColorIds: [],
      currentMaterialIds: [],
      currentSeasonIds: [],
      isDisabled_1: true,
      isDisabled_2: true,
      isDisabled_3: true,
      isDisabled_4: true,
      isDisabled_5: true,
      isDisabled_6: true,
    };
  },
  methods: {
    ...mapMutations([
      "updateFilterPriceFrom",
      "updateFilterPriceTo",
      "updateFilterCategoryId",
      "updateFilterMaterialIds",
      "updateFilterSeasonIds",
      "updateFilterColorIds",
      "updateProductItems",
    ]),
    ...mapActions(["loadProducts"]),
    submit() {
      this.updateFilterPriceFrom(this.currentPriceFrom);
      this.updateFilterPriceTo(this.currentPriceTo);
      this.updateFilterCategoryId(this.currentCategoryId);
      this.updateFilterMaterialIds(this.currentMaterialIds);
      this.updateFilterSeasonIds(this.currentSeasonIds);
      this.updateFilterColorIds(this.currentColorIds);
      this.updateProductItems([]);
      this.loadProducts();
    },
    reset() {
      this.updateFilterPriceFrom(0);
      this.updateFilterPriceTo(0);
      this.updateFilterCategoryId(0);
      this.updateFilterMaterialIds([]);
      this.updateFilterSeasonIds([]);
      this.updateFilterColorIds([]);
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentCategoryId = 0;
      this.currentMaterialIds = [];
      this.currentSeasonIds = [];
      this.currentColorIds = [];
      this.updateProductItems([]);
      this.loadProducts();
    },
  },
  computed: {
    categoriesData() {
      return this.$store.state.categoriesData;
    },
    materialsData() {
      return this.$store.state.materialsData;
    },
    seasonsData() {
      return this.$store.state.seasonsData;
    },
    colorData() {
      return this.$store.state.colorData;
    },
    isDisabled() {
      if (
        this.isDisabled_1 &&
        this.isDisabled_2 &&
        this.isDisabled_3 &&
        this.isDisabled_4 &&
        this.isDisabled_5 &&
        this.isDisabled_6
      ) {
        if (this.currentCategoryId !== 0) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    currentPriceFrom(value) {
      this.isDisabled_1 = value == 0 || value == "" ? true : false;
    },
    currentPriceTo(value) {
      this.isDisabled_2 = value == 0 || value == "" ? true : false;
    },
    currentCategoryId(value) {
      this.isDisabled_3 = value == 0 ? true : false;
    },
    currentMaterialIds(value) {
      this.isDisabled_4 = Number(value) !== 0 ? false : true;
    },
    currentSeasonIds(value) {
      this.isDisabled_5 = Number(value) !== 0 ? false : true;
    },
    currentColorIds(value) {
      this.isDisabled_6 = Number(value) !== 0 ? false : true;
    },
  },
};
</script>
