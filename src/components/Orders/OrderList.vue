<template>
  <div>
    <!-- Display All Orders -->
    <div
      v-for="order in orders"
      :key="order.id"
      class="order-details card shadow-sm mb-4"
      @click="navigateToOrder(order.id)"
      style="cursor: pointer;"
    >
      <div class="card-body">
        <h5 class="card-title">Order ID: {{ order.id }}</h5>
        <p class="card-text"><strong>Address:</strong> {{ order.location }}</p>
        <p class="card-text">
          <strong>Create Time:</strong> {{ new Date(order.createdAt).toLocaleString() }}
        </p>
        <p class="card-text">
          <strong>Delivery Time:</strong> {{ new Date(order.time).toLocaleString() }}
        </p>
        <p class="card-text">
          <strong>State: </strong>
          <span
            :class="{
              'badge': true,
              'bg-danger': order.state === 0,  // Red for state 0 (Packaging)
              'bg-warning': order.state === 1,  // Yellow for state 1 (Sent)
              'bg-success': order.state === 2   // Green for state 2 (Delivered)
            }"
          >
            {{ stateLabel(order.state) }}
          </span>
        </p>
        <p class="card-text" v-if="order.state !== 0">
          <strong>Post Number:</strong> {{ order.postNumber }}
        </p>
        <h6 class="mt-3">Items:</h6>
        <ul class="list-group mb-3">
          <li
            v-for="item in order.items"
            :key="item.id"
            class="list-group-item d-flex justify-content-between"
          >
            <div class="d-flex align-items-center">
              <img :src="L1" alt="Item Image" class="item-image me-2" />
              <span>{{ item.name }} (x{{ item.quantity }})</span>
            </div>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </li>
        </ul>
        <h5 class="text-end">Total Price: <span class="fw-bold">${{ order.totalPrice }}</span></h5>
      </div>
    </div>

    <!-- No Orders Available -->
    <p v-if="orders.length === 0" class="text-center text-muted">No orders available.</p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import L1 from "../../assets/L1.webp";

// Props
defineProps({
  orders: {
    type: Array,
    required: true,
  },
});

// Router
const router = useRouter();

function navigateToOrder(orderId) {
  window.location.href = `order?id=${orderId}`;
}

// Convert state to label
const STATE_LABELS = {
  0: "Packaging",
  1: "Sent",
  2: "Delivered",
};

function stateLabel(state) {
  return STATE_LABELS[state] || "Unknown";
}
</script>

<style scoped>
.order-details {
  border: none;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: rgb(245, 245, 245);
}

.order-details:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 8px;
}
</style>
