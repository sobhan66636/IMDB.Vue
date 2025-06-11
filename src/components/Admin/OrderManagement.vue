<template>
  <div class="container py-4">
    <h2 class="mb-4">Order Management</h2>

    <!-- Search Bar -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Search by Order ID or Customer Email"
      />
    </div>

    <div v-if="filteredOrders.length === 0" class="alert alert-info">
      No orders match your search.
    </div>

    <!-- Orders List -->
    <div v-for="order in filteredOrders" :key="order.id" class="card mb-4 shadow-sm">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Order ID: {{ order.id }}</h5>
      </div>
      <div class="card-body">
        <!-- Customer Info -->
        <div class="mb-3">
          <h6 class="font-weight-bold">Customer Info:</h6>
          <p><strong>Name:</strong> {{ order.customer.name }}</p>
          <p><strong>Email:</strong> {{ order.customer.email }}</p>
        </div>

        <!-- Order Items -->
        <div class="mb-3">
          <h6 class="font-weight-bold">Items:</h6>
          <ul class="list-group">
            <li v-for="(item, index) in order.items" :key="index" class="list-group-item">
              {{ item.name }} (x{{ item.quantity }}) - ${{ item.price * item.quantity }}
            </li>
          </ul>
        </div>

        <!-- Order Summary -->
        <div class="mb-3">
          <p><strong>Total Price:</strong> ${{ order.totalPrice }}</p>
          
          <!-- State with badge colors -->
          <p class="card-text">
            <strong>State: </strong>
            <span
              :class="{
                'badge': true,
                'bg-danger': order.state === 0,  // Red for Packaging
                'bg-warning': order.state === 1,  // Yellow for Sent
                'bg-success': order.state === 2   // Green for Delivered
              }"
            >
              {{ stateLabel(order.state) }}
            </span>
          </p>

          <p><strong>Location:</strong> {{ order.location }}</p>
          <p><strong>Delivery Time:</strong> {{ order.time }}</p>
          <p><strong>Order Created At:</strong> {{ order.createdAt }}</p>
          <p><strong>Post Number:</strong> {{ order.postNumber }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Sample data for orders
const orders = ref([
  {
    id: '123456',
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
    },
    items: [
      { name: 'Product 1', quantity: 2, price: 50 },
      { name: 'Product 2', quantity: 1, price: 100 },
    ],
    totalPrice: 200,
    state: 0, // Initial state: Packaging
    location: '123 Main St, City, Country',
    time: '2025-02-01T10:00:00Z', // Delivery time
    createdAt: '2025-01-28T09:30:00Z',
    postNumber: '123456',
  },
  {
    id: '789012',
    customer: {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
    },
    items: [
      { name: 'Product 3', quantity: 1, price: 30 },
      { name: 'Product 4', quantity: 3, price: 25 },
    ],
    totalPrice: 105,
    state: 1, // State: Shipped
    location: '456 Another St, City, Country',
    time: '2025-02-05T12:00:00Z', // Delivery time
    createdAt: '2025-01-25T11:00:00Z',
    postNumber: '789012',
  },
]);

// State descriptions for orders
const orderStates = ['Packaging', 'Sent', 'Delivered'];

// Search query
const searchQuery = ref('');

// Computed property for filtered orders based on search query
const filteredOrders = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return orders.value.filter(
    (order) =>
      order.id.toLowerCase().includes(query) ||
      order.customer.email.toLowerCase().includes(query)
  );
});

// Method to return state label text
const stateLabel = (state) => {
  return orderStates[state] || 'Unknown';
};
</script>

<style scoped>
/* Styling for the order management page */
.card-header {
  background-color: #007bff;
}

.card-body {
  background-color: #ffffff;
}

h6 {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

ul li {
  margin-bottom: 5px;
}

.list-group-item {
  background-color: #f8f9fa;
}
</style>
