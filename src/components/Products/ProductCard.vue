<template>
  <router-link :to="`/product/${product.name}`" class="card-link">
    <div class="card product-card">
      <img :src="product.image" class="card-img-top" :alt="product.name" />
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text text-muted">{{ product.shortDescription }}</p>
        <p class="card-text fw-bold">$ {{ product.price }}</p>
        <!-- Rating Section -->
        <div class="product-rating">
          <span v-for="star in 5" :key="star" class="star" :class="{ 'filled': star <= product.rating }">★</span>
          <span class="rating-text">({{ product.rating }} / 5)</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.product-card {
  border-radius: 12px; /* Slightly rounded corners for a more polished look */
  overflow: hidden;
  width: 100%; /* Take full width of its container */
  max-width: 350px; /* Set a maximum width for the card */
  height: auto;
  padding: 20px; /* Add padding to the card */
  margin: 15px; /* Add margin to ensure space between cards */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add some shadow for depth */
  transition: transform 0.3s ease; /* Add smooth transition on hover */
}

.product-card img {
  width: 100%;
  height: auto; /* Ensure the image scales properly */
  object-fit: cover; /* Ensure the image covers the available space */
}

.card-body {
  padding: 15px; /* Add padding inside the card body */
}

.card-title {
  font-size: 1.25rem; /* Increase font size for better visibility */
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
}

.card-link {
  text-decoration: none; /* Remove underline from the link */
  color: inherit; /* Inherit color from parent elements */
}

.product-card:hover {
  transform: scale(1.05); /* Slightly enlarge the card on hover for effect */
}

/* Rating Stars Styling */
.product-rating {
  display: flex;
  justify-content: center; /* Center-align the stars and text */
  align-items: center;
  margin-top: 10px;
}

.star {
  color: #ddd;
  font-size: 1.25rem;
}

.star.filled {
  color: #ffcc00; /* Gold color for filled stars */
}

.rating-text {
  font-size: 0.875rem;
  color: #888;
  margin-left: 8px;
}
</style>
