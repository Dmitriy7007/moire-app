<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" :class = "{'pagination__link--disabled': page === 1}" aria-label="Предыдущая страница" @click.prevent="paginatePrev">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>

    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a class="pagination__link" href="#" :class="{'pagination__link--current': pageNumber === page}" @click.prevent="paginate(pageNumber)">
        {{pageNumber}}
      </a>
    </li>

    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" :class = "{'pagination__link--disabled': page === pages}" href="#" aria-label="Следующая страница" @click.prevent="paginateNext">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';

  export default {
    computed: {
      pages() {
        return this.$store.state.productsPagination.pages
      },
      page() {
        return this.$store.state.page
      }
    },
    methods: {
      ...mapMutations(['updatePage']),
      ...mapActions(['loadProducts']),
      paginate(pageNumber) {
        this.$emit('paginate', pageNumber);
        this.updatePage(pageNumber)
      },
      paginateNext() {
        if (this.page < this.pages) {
          this.$emit('paginate', this.page + 1);
          this.updatePage(this.page + 1)
        }
      },
      paginatePrev() {
        if (this.page > 1) {
          this.$emit('paginate', this.page - 1);
          this.updatePage(this.page - 1)
        }
      },
    },
    watch: {
      page() {
        this.loadProducts();
      },
    }
  }
</script>
