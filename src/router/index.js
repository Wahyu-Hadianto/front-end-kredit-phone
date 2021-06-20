import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Products from '../views/Products.vue'
import Me from '../views/Me.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path        : '/product/:slug',
    component   : Product,
    name        : 'Product'
   
  },
  {
    path        : '/products',
    component   : Products,
    name        : 'Products'
   
  },
  {
    path        : '/products/brand/:slug',
    component   : Products,
    name        : 'ProductsBrand',
    
  },
  // =============== Auth Link =============
  {
    path        : '/register',
    component   : Register,
    name        : 'Register',
   
  },
  {
    path        : '/login',
    component   : Login,
    name        : 'Login',
  },
  // ============= User ================
  {
    path        : '/me',
    component   : Me,
    name        : 'Me',
    meta        : {
      requiresAuth: true
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// ========= JIKa USER BELUM LOGIN ============
router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.isLoggedIn){
      next({
        path : '/login'
      })
    }else{
      next()
    }
    }else{
    next()
  }
})



export default router
