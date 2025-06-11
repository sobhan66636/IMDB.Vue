<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Digital Store</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="category-navbar-container">
        <CategoryNavbar />
      </div>
      <SearchBar />
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="loggedInRole">
            <router-link to="/admin" class="nav-link">Admin</router-link>
          </li>
          <li class="nav-item" v-if="loggedInRole">
            <span class="nav-link">|</span>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link">Cart ({{ cartCount }})</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a href="/order" class="nav-link">Orders</a>
          </li>
          <li>
            <span class="nav-link">|</span>
          </li>
          <!-- Conditional rendering for profile, login, and signup -->
          <li class="nav-item" v-if="isLoggedIn">
            <router-link to="/profile" class="nav-link">{{ userName }}</router-link>
          </li>
          <li class="nav-item" v-else>
            <router-link to="/auth#login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a href="#" @click="logout" class="nav-link">Log out</a>
          </li>
          <li class="nav-item" v-else>
            <router-link to="/auth#signup" class="nav-link">Sign up</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SearchBar from './SearchBar.vue'
import CategoryNavbar from './CategoryNavbar.vue'

// Reactive variables
const isLoggedIn = ref(localStorage.getItem('userLoggedIn') !== null);
const userName = ref(localStorage.getItem('userEmail')?.split('@')[0]);
const loggedInRole = ref(localStorage.getItem('userRole') === 'Admin'); // Get stored role
const cartCount = ref(0);

// Method to get cart count from localStorage
const getCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartCount.value = cart.reduce((total, item) => total + item.quantity, 0);
};

// Fetch cart count on component mount
onMounted(() => {
  getCartCount();
});

const logout = () => {
  localStorage.clear();
  alert('Logout successful!');
  window.location.href = '/';
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}

.category-navbar-container {
  display: flex;
  justify-content: flex-start; /* Align to the left on larger screens */
  padding-left: 20px; /* Add padding for alignment */
  padding-right: 20px;
}

@media (max-width: 767px) {
  .category-navbar-container {
    justify-content: center; /* Center the category on small screens */
    padding-left: 0;
    padding-right: 0;
  }
}

.navbar-nav .nav-item {
  padding-left: 10px; /* Optional padding between navbar items */
}
</style>
