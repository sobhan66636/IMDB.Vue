<template>
  <div class="search-bar mx-auto">
    <input
      v-model="searchQuery"
      type="text"
      class="form-control"
      placeholder="Search products..."
      @keyup.enter="performSearch"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const searchQuery = ref('');
const route = useRoute();

// Perform search and reload the page with the query as a URL parameter
const performSearch = () => {
  if (searchQuery.value) {
    window.location.href = `/search?search=${searchQuery.value}`;
  }
};

// Watch for changes in the search query in the URL
watch(() => route.query.search, (newSearchQuery) => {
  if (newSearchQuery !== undefined) {
    searchQuery.value = newSearchQuery;
  }
}, { immediate: true });
</script>

<style scoped>
.search-bar {
  flex-grow: 1;
  max-width: 800px;
}

.search-bar input {
  width: 100%;
  padding: 8px; 
  font-size: 1rem; 
  height: auto; 
}
</style>
