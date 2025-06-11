<template>
  <div class="cart-summary">
    <h3 class="mb-3">Cart Summary</h3>
    <div v-if="cartItems.length > 0">
      <ul class="list-group">
        <li v-for="item in cartItems" :key="item.product.id" class="list-group-item d-flex justify-content-between">
          <span>{{ item.product.name }} (x{{ item.quantity }})</span>
          <span class="fw-bold">$ {{ (item.product.price * item.quantity).toFixed(2) }}</span>
        </li>
      </ul>
      <div class="d-flex justify-content-between mt-3">
        <h5>Total:</h5>
        <h5 class="fw-bold">$ {{ totalPrice }}</h5>
      </div>
      <button class="btn btn-success w-100 mt-3" @click="proceedToCheckout">Proceed to Checkout</button>
    </div>
    <p v-else>Your cart is empty.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Cart data from local storage
const cartItems = ref(JSON.parse(localStorage.getItem('cart')) || []);

// Compute total price of the cart
const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);
});

// Proceed to checkout action
function proceedToCheckout() {
  console.log('Proceeding to checkout');
  // You can add further logic like navigation or form submission here
}
</script>

<style scoped>
.cart-summary {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
}

.cart-summary ul {
  padding-left: 0;
  list-style: none;
}

.cart-summary .btn {
  font-size: 16px;
}
</style>
