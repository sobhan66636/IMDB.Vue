<template>
  <div class="container py-4">
    <h2 class="mb-4">Product Management</h2>

    <!-- Add New Product Button -->
    <button @click="openAddProductModal" class="btn btn-success mb-4">Add New Product</button>

    <!-- Search Bar -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Search by Product Name or Type"
      />
    </div>

    <!-- Products List -->
    <div v-if="filteredProducts.length === 0" class="alert alert-info">
      No products match your search.
    </div>

    <div v-for="product in filteredProducts" :key="product.name" class="card mb-4 shadow-sm">
      <div class="card-header bg-primary text-white">
        <div class="d-flex justify-content-between">
          <h5 class="mb-0">{{ product.name }}</h5>
          <div>
            <button @click="openEditProductModal(product)" class="btn btn-warning btn-sm me-2">Edit</button>
            <button @click="deleteProduct(product)" class="btn btn-danger btn-sm">Delete</button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <!-- Product Images -->
        <div class="mb-3">
          <h6 class="font-weight-bold">Images:</h6>
          <div class="d-flex">
            <img
              v-for="(image, index) in product.images"
              :key="index"
              :src="image"
              class="img-thumbnail me-2"
              alt="Product Image"
              style="width: 100px; height: 100px; object-fit: cover;"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div class="mb-3">
          <p><strong>Type:</strong> {{ product.type }}</p>
          <p><strong>Description:</strong> {{ product.description }}</p>
          <p><strong>Remaining Stock: </strong> 
            <span>{{ product.remainingStock }}</span>
            <button @click="editStock(product)" class="btn btn-sm btn-warning ms-2">Update Stock</button>
          </p>
          <div v-if="product.isEditingStock">
            <input 
              v-model="product.newStock"
              type="number"
              class="form-control form-control-sm"
              style="width: 100px; display: inline-block;"
            />
            <button @click="saveStock(product)" class="btn btn-sm btn-success ms-2">Save</button>
            <button @click="cancelStockEdit(product)" class="btn btn-sm btn-secondary ms-2">Cancel</button>
          </div>
          <p><strong>Price:</strong> ${{ product.price }}</p>
        </div>

        <!-- Product Specifications -->
        <div class="mb-3">
          <h6 class="font-weight-bold">Specifications:</h6>
          <ul class="list-group">
            <li class="list-group-item">Mark: {{ product.mark }}</li>
            <li class="list-group-item">Model: {{ product.model }}</li>
            <li class="list-group-item">Processor: {{ product.processor }}</li>
            <li class="list-group-item">RAM: {{ product.ram }}</li>
            <li class="list-group-item">Storage: {{ product.storage }}</li>
            <li class="list-group-item">Display: {{ product.display }}</li>
            <li class="list-group-item">Battery: {{ product.battery }}</li>
            <li class="list-group-item">OS: {{ product.OS }}</li>
            <li class="list-group-item">Weight: {{ product.weight }}</li>
            <li class="list-group-item">Camera: {{ product.camera }}</li>
            <li class="list-group-item">GPU: {{ product.gpu }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div v-if="showProductModal" class="modal fade show" style="display: block;" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">{{ isEditing ? 'Edit Product' : 'Add Product' }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitProduct">
              <div class="mb-3">
                <label for="productName" class="form-label">Product Name</label>
                <input v-model="productForm.name" type="text" class="form-control" id="productName" required />
              </div>
              <div class="mb-3">
                <label for="productType" class="form-label">Type</label>
                <input v-model="productForm.type" type="text" class="form-control" id="productType" required />
              </div>
              <div class="mb-3">
                <label for="productDescription" class="form-label">Description</label>
                <textarea v-model="productForm.description" class="form-control" id="productDescription" required></textarea>
              </div>
              <div class="mb-3">
                <label for="remainingStock" class="form-label">Remaining Stock</label>
                <input v-model="productForm.remainingStock" type="number" class="form-control" id="remainingStock" required />
              </div>
              <div class="mb-3">
                <label for="productPrice" class="form-label">Price</label>
                <input v-model="productForm.price" type="number" step="0.01" class="form-control" id="productPrice" required />
              </div>

              <!-- Additional Fields -->
              <div class="mb-3">
                <label for="productMark" class="form-label">Mark</label>
                <input v-model="productForm.mark" type="text" class="form-control" id="productMark" required />
              </div>
              <div class="mb-3">
                <label for="productModel" class="form-label">Model</label>
                <input v-model="productForm.model" type="text" class="form-control" id="productModel" required />
              </div>
              <div class="mb-3">
                <label for="productProcessor" class="form-label">Processor</label>
                <input v-model="productForm.processor" type="text" class="form-control" id="productProcessor" required />
              </div>
              <div class="mb-3">
                <label for="productRam" class="form-label">RAM</label>
                <input v-model="productForm.ram" type="text" class="form-control" id="productRam" required />
              </div>
              <div class="mb-3">
                <label for="productStorage" class="form-label">Storage</label>
                <input v-model="productForm.storage" type="text" class="form-control" id="productStorage" required />
              </div>
              <div class="mb-3">
                <label for="productDisplay" class="form-label">Display</label>
                <input v-model="productForm.display" type="text" class="form-control" id="productDisplay" required />
              </div>
              <div class="mb-3">
                <label for="productBattery" class="form-label">Battery</label>
                <input v-model="productForm.battery" type="text" class="form-control" id="productBattery" required />
              </div>
              <div class="mb-3">
                <label for="productOS" class="form-label">Operating System</label>
                <input v-model="productForm.OS" type="text" class="form-control" id="productOS" required />
              </div>
              <div class="mb-3">
                <label for="productWeight" class="form-label">Weight</label>
                <input v-model="productForm.weight" type="text" class="form-control" id="productWeight" required />
              </div>
              <div class="mb-3">
                <label for="productCamera" class="form-label">Camera</label>
                <input v-model="productForm.camera" type="text" class="form-control" id="productCamera" required />
              </div>
              <div class="mb-3">
                <label for="productGpu" class="form-label">GPU</label>
                <input v-model="productForm.gpu" type="text" class="form-control" id="productGpu" required />
              </div>

              <!-- Image URLs -->
              <div v-for="(image, index) in productForm.images" :key="index" class="mb-3">
                <label :for="'imageLink' + index" class="form-label">Image URL {{ index + 1 }}</label>
                <div class="d-flex">
                  <input
                    v-model="productForm.images[index]"
                    type="text"
                    class="form-control"
                    :id="'imageLink' + index"
                    placeholder="Enter image URL"
                    required
                  />
                  <button
                    v-if="index === productForm.images.length - 1"
                    @click.prevent="addImageField"
                    type="button"
                    class="btn btn-outline-secondary ms-2"
                  >
                    +
                  </button>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Add Product' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import L1 from "../../assets/L1.webp";
import L2 from "../../assets/L2.webp";
import L3 from "../../assets/L3.webp";

const mockProducts = [
  {
    name: 'Laptop A',
    type: 'Laptop',
    description: 'A great laptop for work and gaming.',
    remainingStock: 5,
    price: 1000,
    mark: 'Brand A',
    model: 'Model A1',
    processor: 'Intel i7',
    ram: '16GB',
    storage: '512GB SSD',
    display: '15.6 inch Full HD',
    battery: '10 hours',
    OS: 'Windows 10',
    weight: '2kg',
    camera: '1080p',
    gpu: 'NVIDIA GTX 1060',
    images: [L1, L2], // Example image paths
  },
  {
    name: 'Laptop B',
    type: 'Laptop',
    description: 'A great laptop for work and gaming.',
    remainingStock: 3,
    price: 1200,
    mark: 'Brand B',
    model: 'Model B1',
    processor: 'Intel i9',
    ram: '32GB',
    storage: '1TB SSD',
    display: '17.3 inch 4K',
    battery: '12 hours',
    OS: 'Windows 11',
    weight: '1.5kg',
    camera: '720p',
    gpu: 'NVIDIA GTX 3070',
    images: [L3],
  },
  // Other products...
];

const products = ref(mockProducts);
const searchQuery = ref('');
const showProductModal = ref(false);
const isEditing = ref(false);
const productForm = ref({
  name: '',
  type: '',
  description: '',
  remainingStock: '',
  price: '',
  mark: '',
  model: '',
  processor: '',
  ram: '',
  storage: '',
  display: '',
  battery: '',
  OS: '',
  weight: '',
  camera: '',
  gpu: '',
  images: [''], // Start with one image input field
});

const filteredProducts = computed(() => {
  return products.value.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function openAddProductModal() {
  productForm.value = {
    name: '',
    type: '',
    description: '',
    remainingStock: '',
    price: '',
    mark: '',
    model: '',
    processor: '',
    ram: '',
    storage: '',
    display: '',
    battery: '',
    OS: '',
    weight: '',
    camera: '',
    gpu: '',
    images: [''],
  };
  isEditing.value = false;
  showProductModal.value = true;
}

function openEditProductModal(product) {
  productForm.value = { ...product };
  isEditing.value = true;
  showProductModal.value = true;
}

function closeModal() {
  showProductModal.value = false;
}

function submitProduct() {
  if (isEditing.value) {
    const index = products.value.findIndex((product) => product.name === productForm.value.name);
    if (index !== -1) {
      products.value[index] = { ...productForm.value };
    }
  } else {
    products.value.push({ ...productForm.value });
  }
  closeModal();
}

function deleteProduct(product) {
  const index = products.value.findIndex((p) => p.name === product.name);
  if (index !== -1) {
    products.value.splice(index, 1);
  }
}

function addImageField() {
  productForm.value.images.push('');
}
const editStock = (product) => {
  product.isEditingStock = true;
  product.newStock = product.remainingStock; // Set current stock as the new value initially
};

const saveStock = (product) => {
  product.remainingStock = product.newStock;
  product.isEditingStock = false; // Close the edit view
};

const cancelStockEdit = (product) => {
  product.isEditingStock = false; // Cancel the edit view
};
</script>
