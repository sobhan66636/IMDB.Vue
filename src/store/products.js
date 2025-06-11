import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
    productDetails: null,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setProductDetails(state, product) {
      state.productDetails = product;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      // Simulating an API call
      const products = [
        { id: 1, name: 'Laptop', price: 999.99 },
        { id: 2, name: 'Smartphone', price: 499.99 },
      ];
      commit('setProducts', products);
    },
    fetchProductDetails({ commit }, productId) {
      // Simulating an API call
      const product = { id: productId, name: 'Laptop', price: 999.99, description: 'High-end laptop.' };
      commit('setProductDetails', product);
    },
  },
  getters: {
    allProducts: (state) => state.products,
    productDetails: (state) => state.productDetails,
  },
});
