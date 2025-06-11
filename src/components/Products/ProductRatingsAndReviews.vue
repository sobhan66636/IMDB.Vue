<template>
    <div class="col-12">
      <h4>Ratings and Reviews</h4>
      <p><strong>Rating:</strong> {{ rating }} / 5</p>
      <ul class="list-group">
        <li
          v-for="(review, index) in reviews"
          :key="index"
          class="list-group-item"
        >
          <strong>{{ review.user }}:</strong> {{ review.comment }}
          <span class="badge bg-primary float-end">{{ review.rating }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    reviews: {
      type: Array,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  