import { createStore } from 'vuex';

export default createStore({
  state: {
    userProfile: {
      username: 'john_doe',
      email: 'john@example.com',
    },
    userReviews: [],
  },
  mutations: {
    setUserProfile(state, profile) {
      state.userProfile = profile;
    },
    addReview(state, review) {
      state.userReviews.push(review);
    },
  },
  actions: {
    updateUserProfile({ commit }, profile) {
      // Simulating an API call
      commit('setUserProfile', profile);
    },
    submitReview({ commit }, review) {
      // Simulating an API call
      commit('addReview', review);
    },
  },
  getters: {
    userProfile: (state) => state.userProfile,
    userReviews: (state) => state.userReviews,
  },
});
