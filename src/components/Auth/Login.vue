<template>
  <div class="bg-white p-4 rounded shadow text-center w-100 maxwidth">
    <form @submit.prevent="handleLogin" aria-labelledby="login-heading">
      <h2 id="login-heading" class="h4 mb-3">Login</h2>
      <br>

      <!-- Email Field -->
      <label for="login-email" class="d-block text-left">Email:</label>
      <br>
      <input
        v-model="loginEmail"
        type="email"
        id="login-email"
        class="form-control mb-3"
        placeholder="Email"
        required
        aria-required="true"
      />

      <!-- Password Field -->
      <label for="login-password" class="d-block text-left">Password:</label>
      <br>
      <input
        v-model="loginPassword"
        type="password"
        id="login-password"
        class="form-control mb-3"
        placeholder="Password"
        required
        aria-required="true"
      />

      <!-- Role Selection -->
      <label for="role-selection" class="d-block text-left">Role:</label><br />
      <div class="d-flex justify-content-center align-items-center mb-3">
        <label for="user-role" class="me-3">
          <input
            type="radio"
            id="user-role"
            v-model="userRole"
            value="User"
            required
            aria-required="true"
            class="fs-3"
          />
          User
        </label>
        <label for="admin-role">
          <input
            type="radio"
            id="admin-role"
            v-model="userRole"
            value="Admin"
            required
            aria-required="true"
            class="fs-3"
          />
          Admin
        </label>
      </div>

      <button type="submit" class="btn btn-primary w-100 fs-4" aria-label="Login">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loginEmail = ref('')
const loginPassword = ref('')
const userRole = ref('User') // Default role is 'User'

const handleLogin = () => {
  const storedEmail = localStorage.getItem('userEmail')
  const storedPassword = localStorage.getItem('userPassword')
  const storedRole = localStorage.getItem('userRole') // Get stored role

  if (loginEmail.value === storedEmail && loginPassword.value === storedPassword && userRole.value === storedRole) {
    localStorage.setItem('userLoggedIn', 'true')
    localStorage.setItem('loggedInUser', loginEmail.value)
    localStorage.setItem('loggedInRole', userRole.value) // Store logged-in role
    alert('Login successful!')
    window.location.href = '/'
  } else {
    alert('Invalid credentials or role.')
  }
}
</script>
