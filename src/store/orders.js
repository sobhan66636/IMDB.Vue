import { createStore } from 'vuex';

export default createStore({
  state: {
    orders: [],
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders;
    },
    addOrder(state, order) {
      state.orders.push(order);
    },
  },
  actions: {
    fetchOrders({ commit }) {
      // Simulating an API call
      const orders = [
        { id: 1, status: 'Shipped', total: 1499.99, items: [{ product: 'Laptop', quantity: 1 }] },
        { id: 2, status: 'Processing', total: 999.99, items: [{ product: 'Smartphone', quantity: 2 }] },
      ];
      commit('setOrders', orders);
    },
    placeOrder({ commit }, order) {
      commit('addOrder', order);
    },
  },
  getters: {
    allOrders: (state) => state.orders,
  },
});
