<template>
  <Navbar />
  <div class="cart-summary">
    <h3 class="mb-3">Cart Summary</h3>
    <div v-if="cartItems.length > 0">
      <ul class="list-group">
        <li 
          v-for="item in cartItems" 
          :key="item.id" 
          class="list-group-item d-flex align-items-center"
        >
          <!-- Image on the left -->
          <router-link :to="`/product/${item.name}`">
            <img :src="L1" alt="Product Image" class="product-image me-3" />
          </router-link>
          <div class="flex-grow-1">
            <!-- Product name and quantity -->
            <div class="fw-bold">{{ item.name }}</div>
            <div class="text-muted">x{{ item.quantity }}</div>
            <!-- Buttons below on small screens -->
            <div class="mt-2 d-flex align-items-center">
              <button class="btn btn-danger btn-sm me-2" @click="removeFromCart(item.id)">D</button>
              <button class="btn btn-success btn-sm" @click="addToCart(item)">+</button>
            </div>
          </div>
          <!-- Price -->
          <span class="fw-bold text-end">$ {{ (item.price * item.quantity).toFixed(2) }}</span>
        </li>
      </ul>
      <div class="d-flex justify-content-between mt-3">
        <h5>Total:</h5>
        <h5 class="fw-bold">$ {{ totalPrice }}</h5>
      </div>
      <input v-model="address" type="text" placeholder="Enter your address" class="form-control mt-3" />
      <input v-model="time" type="datetime-local" placeholder="Select delivery time" class="form-control mt-3" />
      <button class="btn btn-success w-100 mt-3" @click="proceedToCheckout">Proceed to Checkout</button>
    </div>
    <p v-else>Your cart is empty.</p>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from "../components/Shared/Navbar.vue";
import Footer from "../components/Shared/Footer.vue";
import L1 from "../assets/L1.webp";

const cartItems = ref([]);
const order = ref({});
const address = ref('');
const time = ref('');
const router = useRouter();

onMounted(() => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.value = storedCart;
});

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
});

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  cartItems.value = cart;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
  const cart = cartItems.value.filter(item => item.id !== productId);

  cartItems.value = cart;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function proceedToCheckout() {
  const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
  const newOrderId = storedOrders.length ? storedOrders[storedOrders.length - 1].id + 1 : 1;

  order.value = {
    id: newOrderId,
    items: cartItems.value,
    totalPrice: totalPrice.value,
    state: 0, // Initial state: Packaging
    location: address.value,
    time: new Date(time.value).toISOString(), // Delivery time
    createdAt: new Date().toISOString(), // Order creation time
    postNumber: "123456",
  };

  storedOrders.push(order.value);
  localStorage.setItem('orders', JSON.stringify(storedOrders));
  
  cartItems.value = [];
  localStorage.removeItem('cart');
  
  router.push({ name: 'Order', query: { id: newOrderId } });
}
</script>

<style scoped>
.cart-summary {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: rgb(245, 245, 245);
}

.product-image {
  width: 300px; /* Make the image larger */
  height: 300px;
  object-fit: cover;
  border-radius: 8px; /* Rounded corners for the image */
}

.list-group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .list-group-item {
    flex-wrap: wrap; /* Wrap items on smaller screens */
    text-align: left;
  }
  .product-image {
    width: 150px; /* Adjust image size for smaller screens */
    height: 150px;
  }
  .flex-grow-1 {
    margin-top: 10px; /* Add space between elements */
  }
}
</style>