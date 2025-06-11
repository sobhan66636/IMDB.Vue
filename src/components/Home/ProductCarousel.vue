<template>
  <div class="product-carousel">
    <h2 class="text-center mb-4">{{ title }}</h2>

    <div class="row g-4">
      <router-link
        :to="'/product/' + product.name"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
        v-for="product in visibleProducts"
        :key="product.id"
        style="text-decoration: none;"
      >
        <!-- Use ProductCard component instead of writing card again -->
        <ProductCard :product="product" />
      </router-link>
    </div>

    <!-- Pagination Buttons -->
    <div class="d-flex justify-content-between mt-4">
      <button class="btn btn-outline-primary" @click="prevSlide">&lt; Prev</button>
      <button class="btn btn-outline-primary" @click="nextSlide">Next &gt;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ProductCard from "../Products/ProductCard.vue";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const currentIndex = ref(0);

// Compute visible products (4 at a time)
const visibleProducts = computed(() =>
  props.products.slice(currentIndex.value, currentIndex.value + 4)
);

// Handle previous slide with circular behavior
const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0
      ? Math.floor((props.products.length - 1) / 4) * 4
      : currentIndex.value - 4;
};

// Handle next slide with circular behavior
const nextSlide = () => {
  currentIndex.value =
    currentIndex.value + 4 >= props.products.length
      ? 0
      : currentIndex.value + 4;
};
</script>

<style scoped>
.product-carousel {
  max-width: 1200px;
  margin: 0 auto;
}

button {
  min-width: 100px;
}
</style>
