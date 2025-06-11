<template>
  <div class="filters">
    <h4>Filters</h4>

    <!-- Category Filter -->
    <div class="mb-4">
      <label for="category-select" class="form-label">Category</label>
      <select
        id="category-select"
        v-model="selectedCategoryValue"
        class="form-select"
        @change="emitCategoryChange"
      >
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category.name"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- Mark Filter -->
    <div class="mb-4">
      <label for="mark-select" class="form-label">Mark</label>
      <select
        id="mark-select"
        v-model="selectedMarkValue"
        class="form-select"
        @change="emitMarkChange"
      >
        <option value="">All Marks</option>
        <option
          v-for="mark in marks"
          :key="mark.name"
          :value="mark.name"
        >
          {{ mark.name }}
        </option>
      </select>
    </div>

    <!-- Model Filter -->
    <div class="mb-4">
      <label for="model-select" class="form-label">Model</label>
      <select
        id="model-select"
        v-model="selectedModelValue"
        class="form-select"
        @change="emitModelChange"
      >
        <option value="">All Models</option>
        <option
          v-for="model in models"
          :key="model.name"
          :value="model.name"
        >
          {{ model.name }}
        </option>
      </select>
    </div>

    <!-- Price Filter -->
    <div class="mb-4">
      <label for="price-range" class="form-label">Max Price</label>
      <input
        id="price-range"
        type="range"
        class="form-range"
        v-model="priceFilterValue"
        :min="0"
        :max="2000"
        step="50"
        @change="emitPriceChange"
      />
      <div>Price: ${{ priceFilterValue }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  categories: Array,
  marks: Array,  // Added marks list
  models: Array, // Added models list
  selectedCategory: String,
  selectedMark: String, // Added selectedMark
  selectedModel: String, // Added selectedModel
  priceFilter: Number,
});

const emits = defineEmits(['update-category', 'update-mark', 'update-model', 'update-price']);

const selectedCategoryValue = ref(props.selectedCategory);
const selectedMarkValue = ref(props.selectedMark); // Ref for selected mark
const selectedModelValue = ref(props.selectedModel); // Ref for selected model
const priceFilterValue = ref(props.priceFilter);

watch(() => props.selectedCategory, (newVal) => {
  selectedCategoryValue.value = newVal;
});

watch(() => props.selectedMark, (newVal) => {
  selectedMarkValue.value = newVal;
});

watch(() => props.selectedModel, (newVal) => {
  selectedModelValue.value = newVal;
});

watch(() => props.priceFilter, (newVal) => {
  priceFilterValue.value = newVal;
});

const emitCategoryChange = () => {
  emits('update-category', selectedCategoryValue.value);
};

const emitMarkChange = () => {
  emits('update-mark', selectedMarkValue.value);
};

const emitModelChange = () => {
  emits('update-model', selectedModelValue.value);
};

const emitPriceChange = () => {
  emits('update-price', priceFilterValue.value);
};
</script>
