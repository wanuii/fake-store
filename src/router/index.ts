import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '@/views/ProductView.vue'
import ShoppingCart from '@/components/Cart.vue'
import ProductDetial from '@/views/ProductDetail.vue'
import CheckoutScreen from '@/views/CheckoutScreen.vue'
import OrderSuccess from '@/views/OrderSuccess.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/product/:id',
      name: 'productdetail',
      component: ProductDetial,
      props: true
    },
    {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutScreen
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: OrderSuccess
  }
  ],
  scrollBehavior() {
    // 每次切換頁面都滾動到最上方
    return { top: 0 }
  }
})

export default router
