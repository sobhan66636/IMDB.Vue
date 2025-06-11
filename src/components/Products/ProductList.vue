<template>
  <div>
    <h2 class="mb-4" v-if="currentCategoryName">{{ currentCategoryName }}</h2>

    <div class="d-flex mb-4">
      <button
        v-for="(label, option) in sortingOptions"
        :key="option"
        class="btn btn-outline-primary me-2"
        :class="{ 'bg-primary text-white': selectedSorting === option }"
        @click="emitSortingChange(option)"
      >
        {{ label }}
      </button>
    </div>

    <div v-if="searchQuery" class="mb-4">
      <p>Showing results for: <strong>{{ searchQuery }}</strong></p>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="product in filteredProducts" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>

    <Pagination class="mt-4" />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue';
import Pagination from '../Shared/Pagination.vue';

const props = defineProps({
  filteredProducts: Array,
  sortingOptions: Object,
  selectedSorting: String,
  currentCategoryName: String,
  searchQuery: String,
});

const emits = defineEmits(['update-sorting']);

const emitSortingChange = (option) => {
  emits('update-sorting', option);
};
</script>
