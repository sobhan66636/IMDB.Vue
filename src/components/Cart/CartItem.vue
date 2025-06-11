<template>
    <div class="row cart-item align-items-center mb-3">
      <div class="col-md-3">
        <img :src="cartItem.product.image" class="img-fluid rounded" :alt="cartItem.product.name" />
      </div>
      <div class="col-md-6">
        <h5>{{ cartItem.product.name }}</h5>
        <p class="text-muted">{{ cartItem.product.shortDescription }}</p>
        <p class="fw-bold">$ {{ cartItem.product.price }}</p>
      </div>
      <div class="col-md-3 d-flex align-items-center">
        <button class="btn btn-danger me-2" @click="removeFromCart">Remove</button>
        <input type="number" v-model="cartItem.quantity" min="1" class="form-control w-25" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    cartItem: {
      type: Object,
      required: true,
    },
  });
  
  const emits = defineEmits(['remove-item', 'update-quantity']);
  
  function removeFromCart() {
    emits('remove-item', cartItem.product.id);
  }
  
  function updateQuantity() {
    emits('update-quantity', { productId: cartItem.product.id, quantity: cartItem.quantity });
  }
  </script>
  
  <style scoped>
  .cart-item img {
    max-height: 100px;
    object-fit: contain;
  }
  </style>
  