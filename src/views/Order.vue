<template>
  <div class="order-list">
    <Navbar />
    <div class="container my-5">
      <h3 class="mb-4 text-center">{{ singleOrder ? "Order Details" : "All Orders" }}</h3>

      <!-- Display Single Order -->
      <SingleOrder v-if="singleOrder" :order="singleOrder" />

      <!-- Display All Orders -->
      <OrderList v-else :orders="orders" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../components/Shared/Navbar.vue";
import Footer from "../components/Shared/Footer.vue";
import SingleOrder from "../components/Orders/OrderDetails.vue";
import OrderList from "../components/Orders/OrderList.vue";

const orders = ref([]);
const singleOrder = ref(null);
const route = useRoute();

// Check and update order states
function updateOrderStates() {
  const now = new Date();

  orders.value.forEach((order) => {
    const orderTime = new Date(order.time);
    const orderCreated = new Date(order.createdAt);

    // Check if more than 5 minutes have passed since the order was created
    if (order.state === 0 && now - orderCreated >= 1 * 60 * 1000) {
      order.state = 1; // Update to "Sent"
    }

    // Check if the delivery time has passed
    if (order.state === 1 && now >= orderTime) {
      order.state = 2; // Update to "Delivered"
    }
  });

  // Save the updated orders to localStorage
  localStorage.setItem("orders", JSON.stringify(orders.value));
}

// Load orders and update states
onMounted(() => {
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.value = allOrders;

  // Update order states immediately
  updateOrderStates();

  const orderId = route.query.id;
  if (orderId) {
    singleOrder.value = allOrders.find((order) => order.id === parseInt(orderId));
  }

  // Periodically update states every minute
  setInterval(updateOrderStates, 60 * 1000);
});
</script>
