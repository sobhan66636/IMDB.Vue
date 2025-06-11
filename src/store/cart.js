import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItems: [],
  },
  mutations: {
    addToCart(state, product) {
      const existingProduct = state.cartItems.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, productId) {
      state.cartItems = state.cartItems.filter(item => item.id !== productId);
    },
    updateQuantity(state, { productId, quantity }) {
      const product = state.cartItems.find(item => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
  },
  actions: {
    addProductToCart({ commit }, product) {
      commit('addToCart', product);
    },
    removeProductFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    },
    updateProductQuantity({ commit }, { productId, quantity }) {
      commit('updateQuantity', { productId, quantity });
    },
  },
  getters: {
    cartItems: (state) => state.cartItems,
    cartTotal: (state) => state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
  },
});
