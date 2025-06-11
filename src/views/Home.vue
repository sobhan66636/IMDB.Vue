<template>
  <Navbar />
  <div class="home">
    <!-- Product Carousels -->
    <ProductCarousel
      :products="bestSales"
      title="Best Sales"
    />
    <hr class="section-divider" />
    <ProductCarousel
      :products="laptops"
      title="Laptop"
    />
    <hr class="section-divider" />
    <ProductCarousel
      :products="tablets"
      title="Tablet"
    />
    <hr class="section-divider" />
    <ProductCarousel
      :products="Phones"
      title="Phone"
    />
  </div>
  <Footer />
</template>

<script setup>
import Navbar from "../components/Shared/Navbar.vue";
import Footer from "../components/Shared/Footer.vue";
import ProductCarousel from "../components/Home/ProductCarousel.vue";

import L1 from "../assets/L1.webp";
import L2 from "../assets/L2.webp";
import L3 from "../assets/L3.webp";
import M1 from "../assets/M1.webp";
import M2 from "../assets/M2.webp";
import M3 from "../assets/M3.webp";
import T1 from "../assets/T1.webp";
import T2 from "../assets/T2.webp";
import T3 from "../assets/T3.webp";

const bestSales = [
  { id: 1, name: "L1", price: 1200, image: L1, rating:5 },
  { id: 2, name: "Product 2", price: 899.99, image: L2, rating:4 },
  { id: 3, name: "Product 3", price: 799.99, image: L3, rating:5 },
  { id: 4, name: "Product 4", price: 799.99, image: M1, rating:5 },
  { id: 5, name: "Product 5", price: 699.99, image: M2, rating:5 },
  { id: 6, name: "Product 5", price: 599.99, image: M3, rating:4 },
  { id: 7, name: "Tablet 1", price: 599.99, image: T1, rating:5 },
  { id: 8, name: "Tablet 2", price: 499.99, image: T2, rating:4 },
  { id: 9, name: "Laptop",price: 800, image: T3, rating:4 },
];

const laptops = [
  { id: 1, name: "Laptop", price: 800, image: L1, rating:5 },
  { id: 2, name: "Laptop 2", price: 899.99, image: L2, rating:4 },
  { id: 3, name: "Laptop 1", price: 799.99, image: L3, rating:5 },
];

const tablets = [
  { id: 1, name: "Tablet 1", price: 799.99, image: T1, rating:5 },
  { id: 2, name: "Tablet 2", price: 699.99, image: T2, rating:4 },
  { id: 3, name: "Laptop 1", price: 599.99, image: T3, rating:4 },
];

const Phones = [
  { id: 1, name: "Mobile 1", price: 499.99, image: M1, rating:5 },
  { id: 2, name: "Mobile 2", price: 399.99, image: M2, rating:4 },
  { id: 3, name: "Laptop 1", price: 599.99, image: M3, rating:4 },
];
</script>

<style scoped>
.section-divider {
  border: none;
  border-top: 2px solid #ddd;
  margin: 20px 0;
}
</style>
