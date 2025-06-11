<template>
  <div v-if="comparisonResult" class="comparison-container">
    <h3>Product Comparison</h3>
    <div class="row">
      <div class="col-md-6">
        <div class="product-card">
          <img :src="comparisonResult.product1.image" alt="Product 1" class="product-image" />
          <h4>{{ comparisonResult.product1.name }}</h4>
          <p>{{ comparisonResult.product1.description }}</p>
          <p><strong>Price:</strong> ${{ comparisonResult.product1.price }}</p>
          <p><strong>Rating:</strong> {{ comparisonResult.product1.rating }} / 5</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="product-card">
          <img :src="comparisonResult.product2.image" alt="Product 2" class="product-image" />
          <h4>{{ comparisonResult.product2.name }}</h4>
          <p>{{ comparisonResult.product2.description }}</p>
          <p><strong>Price:</strong> ${{ comparisonResult.product2.price }}</p>
          <p><strong>Rating:</strong> {{ comparisonResult.product2.rating }} / 5</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Please select two products to compare.</p>
  </div>
</template>

<script setup>
defineProps({
  comparisonResult: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped>
.comparison-container {
  border: 1px solid #ddd;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
}

h4 {
  margin-top: 10px;
  font-size: 1.2rem;
}
</style>
