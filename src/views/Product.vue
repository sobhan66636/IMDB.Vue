<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <div v-if="product" class="container my-5">
      <div class="row justify-content-between">
        <div class="col-lg-8">
          <ProductMainInfo :product="product" />
        </div>
        <div class="col-lg-4 d-flex flex-column">
          <!-- Add to Cart Box with same height as the image -->
          <div class="product-add-to-cart-box d-flex justify-content-center align-items-center">
            <ProductAddToCart :product="product" @add-to-cart="handleAddToCart" />
          </div>
        </div>
      </div>

      <div class="row mt-5 justify-content-center">
        <div class="col-12 col-md-8">
          <!-- Description Above the Details -->
          <h2>Introduction</h2>
          <p class="product-description mb-4">{{ product.description }}</p>
          
          <ProductDetails :product="product" />
        </div>
      </div>

      <!-- Move Reviews Below Product Details -->
      <div class="row mt-4 justify-content-center">
        <div class="col-12 col-md-8">
          <ProductRatingsAndReviews
            :reviews="product.reviews"
            :rating="product.rating"
          />
        </div>
      </div>
    </div>

    <div v-else class="text-center my-5">
      <h3>Product Not Found</h3>
      <router-link to="/">Go Back to Home</router-link>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Import Shared Components
import Navbar from '../components/Shared/Navbar.vue';
import Footer from '../components/Shared/Footer.vue';

// Import Product Components
import ProductMainInfo from '../components/Products/ProductMainInfo.vue';
import ProductAddToCart from '../components/Products/ProductAddToCart.vue';
import ProductDetails from '../components/Products/ProductDetails.vue';
import ProductRatingsAndReviews from '../components/Products/ProductRatingsAndReviews.vue';

import L1 from "../assets/L1.webp";
import L2 from "../assets/L2.webp";
import L3 from "../assets/L3.webp";

const route = useRoute();
const product = ref(null);

// Mock Product Data
const mockProducts = [
  {
    name: 'L1',
    type: 'laptop',
    description: 'The latest high-performance laptop with cutting-edge technology.',
    images: [
      L1,
      L2,
      L3,
    ],
    remainingStock: 15, // Added remaining stock
    price: 1200,
    rating: 4.8,
    numberOfRatings: 350,
    reviews: [
      { user: 'John', comment: 'Great laptop for work and play!', rating: 5 },
      { user: 'Jane', comment: 'Amazing performance, but a bit heavy.', rating: 4 },
      { user: 'Alex', comment: 'Battery life could be better.', rating: 4 },
    ],
    mark: 'Lenovo',
    model: 'LP-2025',
    processor: 'Intel Core i9',
    ram: '16GB RAM',
    storage: '1TB SSD',
    display: '3840x2160 4K',
    battery: '82Wh, 8 hours',
    OS: 'Windows 11 Pro',
    weight: '1.8 kg',
    camera: '1080p Full HD Webcam',
    gpu: 'NVIDIA GeForce RTX 3070',
  },
  {
    name: 'Laptop',
    type: 'laptop',
    description: ' cutting-edge technology.',
    images: [
      L1,
      L2,
      L3,
    ],
    remainingStock: 10, // Added remaining stock
    price: 800,
    rating: 4.5,
    numberOfRatings: 350,
    reviews: [
      { user: 'John', comment: 'Great ', rating: 3 },
      { user: 'Jane', comment: 'Amazing  but a bit heavy.', rating: 5 },
      { user: 'Alex', comment: 'Battery life could be better.', rating: 4 },
    ],
    mark: 'Lenovo',
    model: 'LP-2024',
    processor: 'Intel Core i7',
    ram: '8GB RAM',
    storage: '1TB SSD',
    display: '3840x2160 4K',
    battery: '82Wh, 8 hours',
    OS: 'Windows 10 Pro',
    weight: '1.7 kg',
    camera: '1080p Full HD Webcam',
    gpu: 'NVIDIA GeForce RTX 3060',
  },
];


onMounted(() => {
  const productName = route.params.name.toLowerCase();
  product.value = mockProducts.find(
    (item) => item.name.toLowerCase() === productName
  );

  if (!product.value) {
    console.error(`Product not found for name: ${productName}`);
  }
});

function handleAddToCart() {
  console.log(`Added to cart: ${product.value.name}`);
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.row.justify-content-between {
  margin-bottom: 30px;
}

.col-lg-8, .col-lg-4 {
  margin-bottom: 20px;
  position: relative;
}

/* Ensure the image doesn't overflow */
.product-main-info img {
  width: 100%; /* Make image responsive */
  height: auto; /* Keep the aspect ratio */
  border: 3px solid #ddd;
  border-radius: 10px;
  margin-bottom: 20px; /* Add space below the image */
}

.product-add-to-cart-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  height: auto; /* Adjust height automatically */
  flex-grow: 1; /* Allow it to expand and fill the column */
}

.product-add-to-cart-box .btn {
  border-radius: 50px;
  padding: 8px 0;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }

  .row.justify-content-between {
    flex-direction: column;
  }

  .col-lg-8, .col-lg-4 {
    margin-bottom: 20px;
  }
}
</style>
