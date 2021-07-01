import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Products from '../views/Products.vue'
import Me from '../views/Me.vue'
import Order from '../views/Order.vue'
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
    path : '/order',
    component : Order,
    name : 'Order',
    meta    : {requiresAuth :true }
  
  }
  ,
  {
    path        : '/product/:slug',
    component   : Product,
    name        : 'Product',
    
   
  },
  {
    path        : '/products/:search?',
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
    meta        : {
      guest : true
    }
   
  },
  {
    path        : '/login',
    component   : Login,
    name        : 'Login',
    meta        : {
      guest : true
    }
  },
  // ============= User ================
  {
    path        : '/me/:tab?',
    component   : Me,
    name        : 'Me',
    meta        : {
      requiresAuth: true
    }
  },
  {
    path : '*',
    component : ()=>import('../views/404.vue')
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
    }else if(to.matched.some(record => record.meta.guest)){
      if(store.getters.isLoggedIn){
        next({
          path : '/'
        })
      }else{
        next()
      }
  }else{
    next()
  }
})



export default router
