import { createStore } from 'vuex';
import auth from './auth';
import products from './products';
import cart from './cart';
import orders from './orders';
import user from './user';

export default createStore({
  modules: {
    auth,
    products,
    cart,
    orders,
    user,
  },
});
