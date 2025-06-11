<template>
  <Navbar />
  <div class="profile">
    <h2 class="mb-4">User Profile</h2>
    <UserProfile />
    <!-- Profile Form -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Edit Profile</h5>
        <button @click="isEditing = !isEditing" class="btn btn-secondary mb-3">
          {{ isEditing ? 'Cancel' : 'Edit' }}
        </button>
        <form @submit.prevent="updateProfile" v-if="isEditing">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary">Update Profile</button>
        </form>
      </div>
    </div>

    <!-- Order History -->
    <div class="order-history card">
      <div class="card-body">
        <h5 class="card-title">Order History</h5>
        <ul class="list-group list-group-flush">
          <li 
            class="list-group-item clickable"
            v-for="order in orderHistory"
            :key="order.id"
            @click="goToOrder(order.id)"
            :class="{
              'bg-danger': order.state === 0,  // Red for Packaging
              'bg-warning': order.state === 1,  // Yellow for Sent
              'bg-success': order.state === 2   // Green for Delivered
            }"
          >
            Order #{{ order.id }} - ${{ order.totalPrice }} - Status: {{ order.stateText }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Navbar from '../components/Shared/Navbar.vue';
import Footer from '../components/Shared/Footer.vue';
import UserProfile from '../components/User/UserProfile.vue';

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const orderHistory = ref([]);
const isEditing = ref(false);

const stateMapping = {
  0: 'Packaging',
  1: 'Sent',
  2: 'Delivered',
};

// Fetch orders from localStorage
onMounted(() => {
  const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
  // Map state numbers to human-readable text
  orderHistory.value = storedOrders.map(order => ({
    ...order,
    stateText: stateMapping[order.state] || 'Unknown',
  }));

  // Fetch user profile from localStorage
  const storedEmail = localStorage.getItem('userEmail');
  const storedPassword = localStorage.getItem('userPassword');

  if (storedEmail) email.value = storedEmail;
  if (storedPassword) password.value = storedPassword;
});

// Navigate to the specific order details page
function goToOrder(orderId) {
  router.push({ name: 'Order', query: { id: orderId } });
}

function updateProfile() {
  // Save the updated data to localStorage
  localStorage.setItem('userEmail', email.value);
  localStorage.setItem('userPassword', password.value);

  alert('Profile updated!');
  isEditing.value = false; // Exit editing mode
  window.location.reload()
}
</script>

<style scoped>
.profile {
  margin-left: 20px; /* Add space to the left */
}

.profile .card {
  margin-bottom: 20px;
}

.profile .btn {
  font-size: 16px;
}

.profile form {
  margin-top: 10px;
}

.profile .mb-3 {
  margin-bottom: 15px;
}

.clickable {
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.clickable:hover {
  transform: scale(1.01);
}

.bg-danger {
  background-color: #f8d7da !important;
}

.bg-warning {
  background-color: #fff3cd !important;
}

.bg-success {
  background-color: #d4edda !important;
}
</style>
