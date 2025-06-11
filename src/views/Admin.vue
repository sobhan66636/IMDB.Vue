<template>
    <div class="d-flex flex-column min-vh-100">
      <!-- Navbar -->
      <Navbar />
      
      <!-- Main Content Area -->
      <div class="container-fluid py-4 flex-grow-1">
        <h1 class="mb-4">Admin Panel</h1>
        
        <!-- Admin Navigation Links -->
        <nav>
          <router-link 
            to="/admin/products" 
            class="btn mb-2 me-3" 
            :class="{
              'btn-lg': isActive('/admin/products'),
              'btn-dark': isActive('/admin/products'),
              'btn-outline-dark': !isActive('/admin/products')
            }">
            Manage Products
          </router-link>
          <router-link 
            to="/admin/orders" 
            class="btn mb-2" 
            :class="{
              'btn-lg': isActive('/admin/orders'),
              'btn-dark': isActive('/admin/orders'),
              'btn-outline-dark': !isActive('/admin/orders')
            }">
            Manage Orders
          </router-link>
        </nav>
        
        <!-- Dynamic Content from Child Routes -->
        <router-view></router-view>
      </div>
  
      <!-- Footer -->
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import Navbar from '../components/Shared/Navbar.vue';
  import Footer from '../components/Shared/Footer.vue';
  
  const route = useRoute();
  
  // Helper function to check if the route is active
  const isActive = (path) => {
    return route.path === path;
  };
  </script>
  
  <style scoped>
  /* Responsive adjustments for the admin page */
  @media (max-width: 768px) {
    h1 {
      font-size: 1.75rem;
    }
    
    nav {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    
    .btn {
      width: 100%;
      margin-bottom: 10px;
    }
  }
  
  /* Add hover effects to cards (optional, for admin cards) */
  .card {
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .card:hover {
    transform: scale(1.03);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }
  </style>
  