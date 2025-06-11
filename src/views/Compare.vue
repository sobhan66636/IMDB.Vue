<template>
    <Navbar />
    <div class="container my-5">
      <h1 class="text-center mb-4">Product Comparison</h1>
  
      <div v-if="products.length > 0" class="product-comparison">
        <!-- Flexbox container to align cards and table -->
        <div class="d-flex justify-content-center mb-4">
          <div v-for="(product, index) in products" :key="index" class="card-container">
            <ProductCard :product="product" />
          </div>
        </div>
  
        <!-- Comparison Table -->
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Attribute</th>
              <th v-for="(product, index) in products" :key="index">{{ product.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(key, index) in comparisonAttributes" :key="index">
              <td>{{ key }}</td>
              <td v-for="(product, pIndex) in products" :key="pIndex">{{ product[key] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p class="text-center">Loading product details...</p>
      </div>
    </div>
    <Footer />
  </template>
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import ProductCard from '../components/Products/ProductCard.vue';
  import Navbar from "../components/Shared/Navbar.vue";
  import Footer from "../components/Shared/Footer.vue";
  
  import L1 from "../assets/L1.webp";
  import L2 from "../assets/L2.webp";
  import L3 from "../assets/L3.webp";
  import M1 from "../assets/M1.webp";
  import M2 from "../assets/M2.webp";
  import T1 from "../assets/T1.webp";
  import T2 from "../assets/T2.webp";
  
  const products = ref([]);
  const comparisonAttributes = [
    'mark', 'model', 'processor', 'gpu', 'ram', 'storage', 'display', 'battery', 'OS', 'weight', 'camera', 'price', 'rating'
  ];
  
  const route = useRoute();
  
  onMounted(() => {
    const productNames = decodeURIComponent(route.query.products).split(',');
    fetchProductDetails(productNames);
  });
  
  const fetchProductDetails = (productNames) => {
    const allProducts = [
      { name: "L1", mark: "Brand A", model: "Model A", processor: "Intel i5", gpu: "NVIDIA GTX 1650", ram: "8GB", storage: "512GB SSD", display: "15.6\" Full HD", battery: "6 hours", OS: "Windows 10", weight: "1.8kg", camera: "1080p", image: L1, shortDescription: "High performance laptop", price: "1200", rating: 4.5 },
      { name: "Laptop Pro", mark: "Brand A", model: "Model A", processor: "Intel i5", gpu: "NVIDIA GTX 1650", ram: "8GB", storage: "512GB SSD", display: "15.6\" Full HD", battery: "6 hours", OS: "Windows 10", weight: "1.8kg", camera: "1080p", image: L2, shortDescription: "High performance laptop", price: "1200", rating: 4.5 },
      { name: "Laptop", mark: "Brand A", model: "Model A", processor: "Intel i5", gpu: "NVIDIA GTX 1650", ram: "8GB", storage: "512GB SSD", display: "15.6\" Full HD", battery: "6 hours", OS: "Windows 10", weight: "1.8kg", camera: "1080p", image: L3, shortDescription: "High performance laptop", price: "1200", rating: 4.5 },
      { name: "Smartphone", mark: "Brand B", model: "Model B", processor: "AMD Ryzen 5", gpu: "NVIDIA GTX 1660", ram: "16GB", storage: "1TB SSD", display: "14\" 4K", battery: "8 hours", OS: "Windows 11", weight: "1.6kg", camera: "4K", image: M1, shortDescription: "Latest smartphone with advanced features", price: "800", rating: 4.7 },
      { name: "Smartphone Pro", mark: "Brand A", model: "Model A", processor: "Intel i5", gpu: "NVIDIA GTX 1650", ram: "8GB", storage: "512GB SSD", display: "15.6\" Full HD", battery: "6 hours", OS: "Windows 10", weight: "1.8kg", camera: "1080p", image: M2, shortDescription: "High performance laptop", price: "1200", rating: 4.5 },
      { name: "Tablet", mark: "Brand A", model: "Model A", processor: "Intel i5", gpu: "NVIDIA GTX 1650", ram: "8GB", storage: "512GB SSD", display: "15.6\" Full HD", battery: "6 hours", OS: "Windows 10", weight: "1.8kg", camera: "1080p", image: T1, shortDescription: "High performance laptop", price: "1200", rating: 4.5 },
      { name: "Tablet Pro", mark: "Brand A", model: "Model A", processor: "Intel i5", gpu: "NVIDIA GTX 1650", ram: "8GB", storage: "512GB SSD", display: "15.6\" Full HD", battery: "6 hours", OS: "Windows 10", weight: "1.8kg", camera: "1080p", image: T2, shortDescription: "High performance laptop", price: "1200", rating: 4.5 }
    ];
  
    products.value = allProducts.filter(product => productNames.includes(product.name));
  };
  </script>
  