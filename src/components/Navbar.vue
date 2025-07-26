<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useFuncStore } from '@/stores/cart.ts'
import { computed } from 'vue'

const cartstore = useFuncStore()
// 計算購物車內有幾樣商品
const cartItemCount = computed(() => {
  return cartstore.prodspace.length
})
</script>
<template>
  <div class="fixed top-0 h-14 w-full z-50 bg-[#D9A273] shadow-md">
    <div class="flex h-full px-8 py-1 justify-between items-center">
      <RouterLink to="/" class="text-white font-bold text-2xl"> FAKESTORE </RouterLink>
      <div class="flex gap-4">
        <RouterLink to="/shoppingcart" class="relative inline-block">
          <i class="ri-shopping-cart-line text-white" style="font-size: 25px"></i>
          <span
            v-if="cartItemCount > 0"
            class="absolute top-[0px] right-[-10px] bg-white text-[#D9A273] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow"
          >
            {{ cartItemCount }}
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
