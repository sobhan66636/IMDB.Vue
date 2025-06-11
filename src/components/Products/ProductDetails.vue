<template>
    <div class="product-details">
      <h2>Specifications</h2>
      <table class="table table-bordered table-striped">
        <tbody>
          <tr>
            <th>Mark</th>
            <td>{{ product.mark }}</td>
          </tr>
          <tr>
            <th>Model</th>
            <td>{{ product.model }}</td>
          </tr>
          <tr>
            <th>Processor</th>
            <td>{{ product.processor }}</td>
          </tr>
          <tr>
            <th>GPU</th>
            <td>{{ product.gpu }}</td>
          </tr>
          <tr>
            <th>RAM</th>
            <td>{{ product.ram }}</td>
          </tr>
          <tr>
            <th>Storage</th>
            <td>{{ product.storage }}</td>
          </tr>
          <tr>
            <th>Display</th>
            <td>{{ product.display }}</td>
          </tr>
          <tr>
            <th>Battery</th>
            <td>{{ product.battery }}</td>
          </tr>
          <tr>
            <th>Operating System</th>
            <td>{{ product.OS }}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{{ product.weight }}</td>
          </tr>
          <tr>
            <th>Camera</th>
            <td>{{ product.camera }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // Accept the `product` object as a prop
  defineProps({
    product: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .product-details {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .table {
    width: 100%;
    margin: 0;
    border-collapse: collapse;
  }
  
  .table-bordered th,
  .table-bordered td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .table-striped tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: bold;
  }
  </style>
  