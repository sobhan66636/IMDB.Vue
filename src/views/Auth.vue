<template>
    <div class="bg-light app-container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Digital Store</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
      <main class="d-flex justify-content-center align-items-center mt-5 bg-light">
        <button 
          class="btn mx-2"
          :class="isLogin ? 'btn-primary' : 'btn-outline-primary'"
          @click="setLogin"
        >
          Login
        </button>
        <button 
          class="btn mx-2"
          :class="!isLogin ? 'btn-primary' : 'btn-outline-primary'"
          @click="setSignUp"
        >
          Sign Up
        </button>
      </main>
      <div class="content  d-flex justify-content-center align-items-center mt-4">
        <Login v-if="isLogin" />
        <SignUp v-else />
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import SignUp from '../components/Auth/Register.vue';
  import Login from '../components/Auth/Login.vue';
  import Footer from '../components/Shared/Footer.vue'
  
  // Track the current form (Login or Signup) based on the URL hash
  const isLogin = ref(window.location.hash === '#login');
  
  // Change to login view
  const setLogin = () => {
    window.location.hash = '#login'; // Change hash to #login
  };
  
  // Change to signup view
  const setSignUp = () => {
    window.location.hash = '#signup'; // Change hash to #signup
  };
  
  // Handle hash changes and update the isLogin state
  onMounted(() => {
    window.addEventListener('hashchange', () => {
      isLogin.value = window.location.hash === '#login';
    });
  });
  
  // Initial check if the page loads with a hash
  isLogin.value = window.location.hash === '#login';
  </script>
  
  <style scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Ensure the container takes up the full height of the viewport */
  }
  .content {
    flex-grow: 1; /* Allow the content to take up remaining space */
  }
  button {
    width: 120px; /* Uniform button size */
  }
  .maxwidth {
    max-width: 400px;
  }
  </style>
  
  
  