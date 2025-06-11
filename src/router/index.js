import { createRouter, createWebHistory } from 'vue-router';

// Import Views
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Cart from '../views/Cart.vue';
import Order from '../views/Order.vue';
import Admin from '../views/Admin.vue';
import Profile from '../views/Profile.vue';
import Auth from '../views/Auth.vue';
import Product from '../views/Product.vue';
import Compare from '../views/Compare.vue';

// Import Nested Components for Dynamic Routes
import ProductManagement from '../components/Admin/ProductManagement.vue';
import OrderManagement from '../components/Admin/OrderManagement.vue';

// Define Routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: { requiresGuest: true }, // Requires user to be a guest (not logged in)
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/compare',
    name: 'Compare',
    component: Compare,
  },
  {
    path: '/product/:name',
    name: 'Product',
    component: Product,
    props: true, // Allows passing the `id` as a prop
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true }, // Requires authentication
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: { requiresAuth: true }, // Requires authentication
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }, // Requires authentication
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, requiresAdmin: true }, // Requires authentication and admin role
    children: [
      {
        path: 'products',
        name: 'ProductManagement',
        component: ProductManagement,
      },
      {
        path: 'orders',
        name: 'OrderManagement',
        component: OrderManagement,
      },
    ],
  }
];

// Create Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication, role, and guest status
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  const userRole = localStorage.getItem('loggedInRole');

  // If route requires authentication and user is not logged in
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Auth' }); // Redirect to Auth page if not logged in
  } 
  // If route requires admin role and user is not admin
  else if (to.meta.requiresAdmin && userRole !== 'Admin') {
    next({ name: 'Home' }); // Redirect to Home if not admin
  } 
  // If route requires guest status and user is logged in (prevents logged-in users from going to Auth)
  else if (to.meta.requiresGuest && isLoggedIn) {
    next({ name: 'Home' }); // Redirect to Home if already logged in
  } else {
    next(); // Allow the navigation
  }
});

export default router;
