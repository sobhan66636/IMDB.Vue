<template>
  <div
    class="category-navbar"
    @mouseenter="showCategories = true"
    @mouseleave="showCategories = false"
  >
    <div class="category-label">Categories</div>
    <ul
      v-if="showCategories"
      class="nav flex-column category-dropdown"
      style="position: absolute; top: 100%; left: 0; z-index: 10; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);"
    >
      <li
        class="nav-item"
        v-for="category in categories"
        :key="category.id"
      >
        <router-link
          :to="`/search?category=${category.name.toLowerCase()}`"
          class="nav-link"
          @click.prevent="reloadPage(category.name)"
        >
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const showCategories = ref(false);
const categories = ref([
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Phone' },
  { id: 3, name: 'Tablet' },
]);

const router = useRouter();

const reloadPage = (categoryName) => {
  // Update the URL to the search page with the selected category
  window.location.href =`/search?category=${categoryName.toLowerCase()}`;
};
</script>

<style scoped>
.category-navbar {
  padding: 10px;
  width: 200px;
  position: relative;
  border-bottom: 2px solid #ddd;
}

.category-navbar .category-label {
  cursor: pointer;
  padding: 10px;
}

.category-dropdown {
  background-color: #f8f9fa;
  width: 100%;
  border-radius: 5px;
  list-style-type: none;
  padding: 0;
}

.category-dropdown .nav-link {
  padding: 10px;
  cursor: pointer;
  text-align: left;
}

.category-dropdown .nav-link:hover {
  background-color: #007bff;
  color: white;
}
</style>
