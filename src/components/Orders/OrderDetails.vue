<template>
  <div class="order-details card shadow-sm">
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
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <!-- Product Image -->
          <router-link :to="`/product/${item.name}`">
            <div class="d-flex align-items-center me-3">
              <img :src="L1" alt="Item Image" class="item-image" />
            </div>
          </router-link>
          <!-- Product Info and Rating/Comment Section -->
          <div class="d-flex flex-column align-items-center flex-grow-1">
            <span>{{ item.name }} (x{{ item.quantity }})</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>

            <!-- Rating and Comment Section (Visible if Delivered) -->
            <div v-if="order.state === 2" class="mt-3 w-100 text-center">
              <label for="comment-{{ item.id }}" class="form-label">Your Comment:</label>
              <textarea
                v-model="item.comment"
                id="comment-{{ item.id }}"
                class="form-control"
                placeholder="Write your comment..."
                rows="3"
                :disabled="item.submitted"
              ></textarea>

              <label for="rating-{{ item.id }}" class="form-label mt-2">Rating (1-5):</label>
              <!-- Star Rating -->
              <div class="star-rating mt-2">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star"
                  :class="{'filled': item.rating >= star}"
                  @click="setRating(item, star)"
                >
                  ★
                </span>
              </div>

              <button
                v-if="!item.submitted"
                class="btn btn-primary m-4"  
                @click="submitRating(item)"
                :disabled="item.submitted"  
              >
                Submit
              </button>
            </div>
          </div>
        </li>
      </ul>
      <h5 class="text-end">Total Price: <span class="fw-bold">${{ order.totalPrice }}</span></h5>
    </div>
  </div>
</template>

<script setup>
import L1 from "../../assets/L1.webp";

// Props
defineProps({
  order: {
    type: Object,
    required: true,
  },
});

// Convert state to label
const STATE_LABELS = {
  0: "Packaging",
  1: "Sent",
  2: "Delivered",
};

function stateLabel(state) {
  return STATE_LABELS[state] || "Unknown";
}

// Submit the rating and comment for an item
function submitRating(item) {
  // Perform the necessary logic to handle the comment and rating submission
  item.submitted = true;
  // Optionally, save the comment and rating to a database or state
  console.log(`Submitted comment: ${item.comment}, rating: ${item.rating}`);
}

// Set the rating based on the clicked star
function setRating(item, rating) {
  if (!item.submitted) {
    item.rating = rating;
  }
}
</script>

<style scoped>
.order-details {
  border: none;
  border-radius: 8px;
  background-color: rgb(245, 245, 245);
}

.item-image {
  width: 100%;
  max-width: 200px; /* Reverted image size */
  height: auto;
  border-radius: 8px;
}

/* Star Rating Style */
.star-rating {
  display: inline-block;
}

.star {
  font-size: 1.5rem;
  color: #ccc;
  cursor: pointer;
}

.star.filled {
  color: gold;
}

/* Responsive Design */
@media (max-width: 576px) {
  .order-details {
    font-size: 0.875rem; /* Smaller text for mobile */
  }

  .item-image {
    max-width: 200px; /* Smaller image on small screens */
  }

  .list-group-item {
    flex-direction: column; /* Stack items vertically on small screens */
    align-items: flex-start; /* Align items to the left */
  }

  .order-details .d-flex {
    justify-content: space-between; /* Space between image and details */
  }

  .d-flex.flex-column {
    align-items: center;
  }
}

textarea.form-control {
  resize: vertical;
  width: 100%;
}

input.form-control {
  width: 100%;
}
</style>
