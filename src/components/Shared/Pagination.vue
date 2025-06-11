<template>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage <= 1 }">
          <button class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li class="page-item" v-for="pageNum in totalPages" :key="pageNum" :class="{ active: currentPage === pageNum }">
          <button class="page-link" @click="changePage(pageNum)">{{ pageNum }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
          <button class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const currentPage = ref(1);
  const totalPages = ref(5);  // Set the total pages dynamically
  
  function changePage(pageNum) {
    if (pageNum >= 1 && pageNum <= totalPages.value) {
      currentPage.value = pageNum;
      // You can handle fetching data for the selected page here
      console.log('Page changed to:', currentPage.value);
    }
  }
  </script>
  
  <style scoped>
  .pagination {
    justify-content: center;
    margin-top: 20px;
  }
  </style>
  