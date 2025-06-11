<template>
  <div class="col-md-6">
    <!-- Price and Add to Cart Section with Boxing around the entire section -->
    <div class="text-center">
      <!-- Price and remaining stock on the same line, wrapping if necessary -->
      <div class="d-flex justify-content-center mb-3 align-items-center flex-wrap">
        <!-- Price -->
        <div class="d-flex align-items-center me-3 mb-2 mb-md-0">
          <p class="fw-bold" style="font-size: 2rem; color: #333; margin-right: 10px;">Price:</p>
          <p class="fw-bold" style="font-size: 2rem; color: #333;">$ {{ product.price }}</p>
        </div>

        <!-- Remaining Stock -->
        <div class="d-flex align-items-center mb-2 mb-md-0">
          <p class="text-muted" style="font-size: 1.2rem;">
            Remaining: <span class="fw-bold">{{ product.remainingStock }}</span>
          </p>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <button
        class="btn btn-primary"
        @click="addToCart"
        :disabled="product.remainingStock === 0" 
        style="transition: transform 0.3s ease;"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Function to add a product to the cart
function addToCart() {
  // Create a cart item object
  const cartItem = {
    name: props.product.name,
    price: props.product.price,
    image: props.product.image, // assuming `image` is a property of `product`
    quantity: 1, // Default quantity is 1
  };

  // Retrieve the existing cart from local storage or initialize an empty array
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the item is already in the cart based on the name
  const existingItem = cart.find(item => item.name === cartItem.name);

  if (existingItem) {
    // If item exists, increase quantity by 1
    existingItem.quantity += 1;
  } else {
    // Add new item to cart
    cart.push(cartItem);
  }

  // Save the updated cart back to local storage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Display a message to the user without refreshing the page
  alert(`${cartItem.name} has been added to your cart!`);
  window.location.reload()
}
</script>

<style scoped>
.btn-primary:hover {
  background-color: #0056b3;
  transform: scale(1.05); /* Smooth hover effect */
}
</style>
