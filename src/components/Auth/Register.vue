<template>
  <div class="bg-white p-4 rounded shadow text-center w-100 maxwidth">
    <form @submit.prevent="handleSignup" aria-labelledby="signup-heading">
      <h2 id="signup-heading" class="h4 mb-3">Signup</h2>
      <br>

      <!-- Email Field -->
      <label for="signup-email" class="d-block text-left">Email:</label>
      <br>
      <input
        v-model="signupEmail"
        type="email"
        id="signup-email"
        class="form-control mb-3"
        placeholder="Email"
        required
        aria-required="true"
      />

      <!-- Password Field -->
      <label for="signup-password" class="d-block text-left">Password:</label>
      <br>
      <input
        v-model="signupPassword"
        type="password"
        id="signup-password"
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
        <label for="admin-role" >
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

      <button type="submit" class="btn btn-primary w-100 fs-4" aria-label="Signup">Signup</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const signupEmail = ref('')
const signupPassword = ref('')
const userRole = ref('User') // Default role is 'User'

const handleSignup = () => {
  const dateOfCreation = new Date().toISOString()

  localStorage.setItem('userEmail', signupEmail.value)
  localStorage.setItem('userPassword', signupPassword.value)
  localStorage.setItem('userRole', userRole.value)
  localStorage.setItem('createdAt', dateOfCreation)

  alert('Signup successful! You can now log in.')
  window.location.hash = '#login' // Automatically show login form after signup
}
</script>
