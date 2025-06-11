<template>
  <div class="container">
    <div class="d-flex flex-column flex-md-row">
      <!-- Image Carousel -->
      <div
        class="carousel slide"
        id="productImagesCarousel"
        data-bs-ride="carousel"
        style="width: 100%; max-width: 500px; height: 400px;"
      >
        <div class="carousel-inner" style="height: 100%;">
          <div
            v-for="(image, index) in product.images"
            :key="index"
            class="carousel-item"
            :class="{ active: index === 0 }"
          >
            <img
              :src="image"
              class="d-block w-100"
              :alt="product.name"
              style="height: 100%; object-fit: cover;"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#productImagesCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#productImagesCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <!-- Product Info and Ratings & Reviews -->
      <div
        class="mt-4 mt-md-0 ms-md-4 w-100"
        style="font-size: 1rem;"
      >
        <!-- Product Basic Info -->
        <div>
          <h5 class="fw-bold" style="font-size: 1.25rem;">{{ product.name }}</h5><br>
          <ul class="list-unstyled" style="font-size: 1.1rem; line-height: 1.8;">
            <li><strong>Model:</strong> {{ product.model }}</li>
            <li><strong>Processor:</strong> {{ product.processor }}</li>
            <li><strong>RAM:</strong> {{ product.ram }}</li>
            <li><strong>Storage:</strong> {{ product.storage }}</li>
            <li><strong>Display:</strong> {{ product.display }}</li>
          </ul>
        </div>

        <!-- Product Ratings and Reviews -->
        <div class="mt-3" style="font-size: 1.1rem; line-height: 1.8;">
          <p><strong><span class="star">★</span> Rating:</strong> {{ product.rating.toFixed(1) }} / 5</p>
          <p><strong>Number of Ratings:</strong> {{ product.numberOfRatings }}</p>
          <p><strong>Number of Reviews:</strong> {{ product.reviews.length }}</p>
        </div>

        <!-- Current Image Number -->
        <div class="mt-3" style="font-size: 1rem;">
          <p>Image {{ currentImage + 1 }} of {{ product.images.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});

import { ref, onMounted } from 'vue';

// Track the current active image index
const currentImage = ref(0);

// Update the currentImage when the carousel changes
onMounted(() => {
  const carouselElement = document.getElementById('productImagesCarousel');
  carouselElement.addEventListener('slid.bs.carousel', (event) => {
    currentImage.value = event.to;
  });
});
</script>

<style scoped>
.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: red; /* Make the carousel control icons red */
}

.carousel-control-prev,
.carousel-control-next {
  color: red; /* Ensure the icon color is red */
}

.carousel-control-prev-icon::before,
.carousel-control-next-icon::before {
  font-size: 1.5rem; /* Adjust the size of the icons */
}
.star {
  color: gold;
}
</style>
