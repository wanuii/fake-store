<script setup lang="ts">
import { ref } from 'vue'
import { useFuncStore } from '@/stores/cart.ts'
import { useRouter } from 'vue-router'
const router = useRouter()

const cartstore = useFuncStore()
const products = ref(cartstore.prodspace)
const handleQuantityChange = (prod: { ID: number; quantity: number }) => {
  if (prod.quantity < 1) {
    cartstore.deletePro(prod) // 避免輸入非法值
  }
}
const ChooseProduct = (item: any) => {
  router.push({ name: 'productdetail', params: { id: item.ID } })
}
const goToCheckout = () => {
  router.push('/checkout')
}
</script>
<template>
  <div class="mt-20 flex flex-col max-w-4xl mx-auto px-4">
    <div class="flex items-center gap-2">
      <i class="ri-shopping-cart-line text-[#D9A273]" style="font-size: 30px"></i>
      <p class="text-[#7A7A7A] text-xl">購物清單</p>
    </div>
    <div
      class="flex flex-col border border-[#D9A273] rounded p-5"
      :class="products.length === 0 ? 'min-h-96 items-center justify-center' : ''"
    >
      <h1 v-if="products.length === 0" class="text-xl">購物車內還沒有任何商品哦!</h1>
      <div v-else>
        <div v-for="(prod, index) in products" :key="index" class="border-b border-[#D9A273] py-4">
          <div class="flex gap-5 items-center">
            <img
              :src="prod.Images"
              class="object-scale-down shrink-0 cursor-pointer"
              @click="ChooseProduct(prod)"
            />
            <div class="flex flex-col w-full gap-2">
              <h2
                class="font-semibold text-base md:text-lg cursor-pointer"
                :title="prod.Title"
                @click="ChooseProduct(prod)"
              >
                {{ prod.Title }}
              </h2>
              <div class="flex flex-wrap items-center gap-4 justify-between">
                <p class="text-[#D9A273] font-bold text-base">${{ prod.Price }}</p>
                <div class="flex md:gap-10 gap-3">
                  <el-input-number
                    v-model="prod.quantity"
                    :min="0"
                    :max="99"
                    @change="handleQuantityChange(prod)"
                    size="small"
                  />
                  <el-button
                    style="color: #d9a273; border-color: #d9a273"
                    @click="cartstore.deletePro(prod)"
                  >
                    刪除
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end items-center gap-10 mt-5 mr-10">
          <p class="text-xl font-bold">
            總金額：
            <span class="text-[#D9A273]">$ {{ cartstore.totalAmount }}</span>
          </p>
          <el-button
            style="background-color: #d9a273; color: white; transform: scale(1.2)"
            @click="goToCheckout"
            >結帳</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
img {
  margin: 1vw;
  width: 10vw;
  height: 10vw;
}

h2 {
  font-size: 1rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 顯示的行數 */
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
