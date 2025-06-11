<template>
  <section class="row bg-white p-4 mb-4 rounded shadow-sm" id="profile-section">
    <div class="col-auto">
      <img
        :src="userProfile.profileImage"
        alt="Profile Picture"
        class="rounded-circle"
        width="100px"
        height="100px"
      />
    </div>
    <div class="col">
      <h2 class="fs-3">{{ userProfile.name }}</h2>
      <p class="fs-6">Email: {{ userProfile.email }}</p>
      <p class="fs-6">Joined: {{ userProfile.joinDate }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import profile from '../../assets/profile.jpg';

const userProfile = ref({
  name: '',
  email: '',
  joinDate: '',
  profileImage: profile,
});

onMounted(() => {
  const email = localStorage.getItem('userEmail');
  const createdAt = localStorage.getItem('createdAt');
  userProfile.value.name = email ? email.split('@')[0] : 'Guest';
  userProfile.value.email = email || 'Not provided';
  userProfile.value.joinDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      })
    : 'Not available';
});
</script>
