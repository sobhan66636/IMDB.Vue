<template>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
        <li class="breadcrumb-item" v-if="currentPage">{{ currentPage }}</li>
      </ol>
    </nav>
  </template>
  
  <script setup>
  import { ref, defineProps, watchEffect } from 'vue';
  
  const { page } = defineProps({
    page: {
      type: String,
      default: ''
    }
  });
  
  const currentPage = ref(page);
  
  watchEffect(() => {
    if (page) {
      currentPage.value = page;
    }
  });
  </script>
  
  <style scoped>
  .breadcrumb {
    margin-bottom: 20px;
  }
  </style>
  