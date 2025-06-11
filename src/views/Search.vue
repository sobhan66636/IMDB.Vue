<template>
  <Navbar />
  <div class="container mt-4">
    <div class="row">
      <!-- Left Sidebar for Filters -->
      <div class="col-md-3">
        <div class="filter-box">
          <ProductFilter
            :categories="categories"
            :marks="marks"
            :models="models"
            :selected-category="selectedCategory"
            :selected-mark="selectedMark"
            :selected-model="selectedModel"
            :price-filter="priceFilter"
            @update-category="updateCategory"
            @update-mark="updateMark"
            @update-model="updateModel"
            @update-price="updatePrice"
          />
          <button class="btn btn-secondary mt-3" @click="resetFilters">Refresh Filters</button>
        </div>
        
        <!-- Product Compare Section Below Filters -->
        <div class="mt-4 filter-box">
          <h5>Compare Products</h5>
          
          <div v-for="(selectedProduct, index) in selectedProducts" :key="index" class="form-group mb-3">
            <label :for="'product' + (index + 1)">Select Product {{ index + 1 }}</label>
            <select
              :id="'product' + (index + 1)"
              v-model="selectedProducts[index]"
              class="form-select"
              aria-label="Select Product"
            >
              <option v-for="product in filteredProducts" :key="product.id" :value="product.name">
                {{ product.name }}
              </option>
            </select>
          </div>

          <button class="btn btn-secondary m-2" @click="addProductField" :disabled="selectedProducts.length >= 4">
            +
          </button>

          <button
            class="btn btn-primary m-4"
            :disabled="selectedProducts.some(product => !product)"
            @click="goToComparePage"
          >
            Compare
          </button>
        </div>
      </div>

      <!-- Right Side: Product List -->
      <div class="col-md-9">
        <ProductList
          :filtered-products="filteredProducts"
          :sorting-options="sortingOptions"
          :selected-sorting="selectedSorting"
          :current-category-name="currentCategoryName"
          :search-query="searchQuery"
          @update-sorting="selectSorting"
        />
      </div>
    </div>
  </div>
  <Footer />
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navbar from '../components/Shared/Navbar.vue';
import Footer from '../components/Shared/Footer.vue';
import ProductFilter from '../components/Products/ProductFilter.vue';
import ProductList from '../components/Products/ProductList.vue';


import L1 from '../assets/L1.webp';
import L2 from '../assets/L2.webp';
import L3 from '../assets/L3.webp';
import M1 from '../assets/M1.webp';
import M2 from '../assets/M2.webp';
import M3 from '../assets/M3.webp';
import T1 from '../assets/T1.webp';
import T2 from '../assets/T2.webp';
import T3 from '../assets/T3.webp';

// Products and categories
const products = ref([
  { id: 1, name: 'L1', description: 'High performance laptop.', price: 999.99, image: L1, categoryName: 'laptop', mark: 'Mark1', model: 'L1', bought: 200, createdAt: '2024-01-01' ,rating:5},
  { id: 2, name: 'Smartphone', description: 'Sleek design smartphone.', price: 499.99, image: M1, categoryName: 'phone', mark: 'Mark2', model: 'S2', bought: 150, createdAt: '2023-12-15' ,rating:4 },
  { id: 3, name: 'Tablet', description: 'Compact tablet with great battery life.', price: 299.99, image: T1, categoryName: 'tablet', mark: 'Mark3', model: 'T3', bought: 120, createdAt: '2024-01-10' ,rating:5},
  { id: 4, name: 'Laptop', description: 'Professional laptop for power users.', price: 1499.99, image: L2 , categoryName: 'laptop', mark: 'Mark1', model: 'LPro', bought: 350, createdAt: '2024-01-12' ,rating:5},
  { id: 5, name: 'Smartphone Pro', description: 'Pro version with advanced features.', price: 799.99, image: M2, categoryName: 'phone', mark: 'Mark2', model: 'SPro', bought: 220, createdAt: '2023-11-20',rating:4 },
  { id: 6, name: 'Tablet Pro', description: 'Tablet with pro features for work and play.', price: 499.99, image: T2, categoryName: 'tablet', mark: 'Mark3', model: 'TPro', bought: 180, createdAt: '2024-01-05',rating:4 },
  { id: 7, name: 'Laptop Pro', description: 'Professional laptop for power users.', price: 1499.99, image:L3 , categoryName: 'laptop', mark: 'Mark1', model: 'LPro', bought: 350, createdAt: '2024-01-12' ,rating:5},
  { id: 8, name: 'Smartphone Pro', description: 'Pro version with advanced features.', price: 799.99, image: M3, categoryName: 'phone', mark: 'Mark2', model: 'SPro', bought: 220, createdAt: '2023-11-20',rating:4 },
  { id: 9, name: 'Tablet Pro', description: 'Tablet with pro features for work and play.', price: 499.99, image: T3, categoryName: 'tablet', mark: 'Mark3', model: 'TPro', bought: 180, createdAt: '2024-01-05',rating:4 },
]);

const categories = ref([
  { id: 1, name: 'laptop' },
  { id: 2, name: 'phone' },
  { id: 3, name: 'tablet' },
]);

const marks = ref([
  { id: 1, name: 'Mark1' },
  { id: 2, name: 'Mark2' },
  { id: 3, name: 'Mark3' },
]);

const models = ref([
  { id: 1, name: 'L1' },
  { id: 2, name: 'S2' },
  { id: 3, name: 'T3' },
]);

// Filters and state
const selectedCategory = ref('');
const selectedMark = ref('');
const selectedModel = ref('');
const priceFilter = ref(2000); // Default price filter
const selectedSorting = ref('price-asc');
const searchQuery = ref('');

// Route and router
const route = useRoute();
const router = useRouter();

const selectedProducts = ref([null, null]); // To hold the selected products for comparison

// Function to dynamically add more product fields for comparison (up to 4)
const addProductField = () => {
  if (selectedProducts.value.length < 4) {
    selectedProducts.value.push(null);
  }
};

// Navigate to comparison page with the selected products
const goToComparePage = () => {
  const productNames = selectedProducts.value.filter(Boolean).map(product => encodeURIComponent(product));
  if (productNames.length >= 2) {
    router.push({
      path: '/compare',
      query: {
        products: productNames.join(',')
      }
    });
  }
};
// Compute category name
const currentCategoryName = computed(() => {
  return selectedCategory.value || '';
});
// Sync filters with query parameters
onMounted(() => {
  const query = route.query;

  if (query.category) {
    selectedCategory.value = query.category;
  }

  if (query.price) {
    priceFilter.value = parseInt(query.price);
  }

  if (query.mark) {
    selectedMark.value = query.mark;
  }

  if (query.model) {
    selectedModel.value = query.model;
  }

  if (query.search) {
    searchQuery.value = query.search;
  }
});

// Filtered products
const filteredProducts = computed(() => {
  let filtered = products.value;

  // Search by name
  if (searchQuery.value) {
    filtered = filtered.filter((product) => (product.name.toLowerCase()).includes(searchQuery.value));
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter((product) => product.categoryName === selectedCategory.value);
  }

  // Filter by mark
  if (selectedMark.value) {
    filtered = filtered.filter((product) => product.mark === selectedMark.value);
  }

  // Filter by model
  if (selectedModel.value) {
    filtered = filtered.filter((product) => product.model === selectedModel.value);
  }

  // Filter by price
  if (priceFilter.value) {
    filtered = filtered.filter((product) => product.price <= priceFilter.value);
  }

  return filtered;
});

// Update query parameters
const updateQueryParams = () => {
  const queryParams = {};

  if (selectedCategory.value) {
    queryParams.category = selectedCategory.value;
  }

  if (selectedMark.value) {
    queryParams.mark = selectedMark.value;
  }

  if (selectedModel.value) {
    queryParams.model = selectedModel.value;
  }

  if (priceFilter.value !== 2000) {
    queryParams.price = priceFilter.value;
  }

  if (searchQuery.value) {
    queryParams.search = searchQuery.value;
  }

  router.push({ query: queryParams });
};

// Reset filters to default values
const resetFilters = () => {
  selectedCategory.value = '';
  selectedMark.value = '';
  selectedModel.value = '';
  priceFilter.value = 2000;
  searchQuery.value = '';
  updateQueryParams();
};

// Update filters
const updateCategory = (category) => {
  selectedCategory.value = category;
  updateQueryParams();
};

const updateMark = (mark) => {
  selectedMark.value = mark;
  updateQueryParams();
};

const updateModel = (model) => {
  selectedModel.value = model;
  updateQueryParams();
};

const updatePrice = (price) => {
  priceFilter.value = price;
  updateQueryParams();
};

const selectSorting = (option) => {
  selectedSorting.value = option;
};
</script>



<style scoped>
.filter-box {
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
}
</style>
