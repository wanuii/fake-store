import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '../views/ProductView.vue'
import ProductDetial from '../views/ProductDetail.vue'
import ShoppingCart from '../components/Cart.vue'

const router = createRouter({
  history: createWebHistory('/project-name/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductView
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: ShoppingCart
    },
    {
      path: '/productdetial',
      name: 'productdetial',
      component: ProductDetial, 
      props: true
    }
  ]
})

export default router
