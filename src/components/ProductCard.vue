<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { useFuncStore } from '@/stores/cart'
import { ref, watch } from 'vue'

const router = useRouter()
const cartstore = useFuncStore()
const loading = ref(true)

// 點擊商品，展示商品描述
const ChooseProduct = (product: any) => {
  router.push({
    name: 'productdetail',
    params: { id: product.ID }
  })
}
const AddToCart = (product: any) => {
  cartstore.addPro(product)
  ElNotification({
    title: '已新增進購物車!',
    type: 'success'
  })
}
const props = defineProps<{
  shopprods: Array<{
    Title: string
    Price: number
    Images: string
    ID: number
    Description: string
    Rate: number
  }>
}>()

watch(
  () => props.shopprods.length,
  (newLength) => {
    loading.value = true
    if (newLength > 0) loading.value = false
  },
  { immediate: true }
)
</script>
<template>
  <div class="grid md:grid-cols-4 grid-cols-2 gap-16" v-loading="loading">
    <div
      class="flex flex-col gap-5 cursor-pointer"
      v-for="(prod, index) in shopprods"
      :key="index"
      @click="ChooseProduct(prod)"
    >
      <div class="relative group w-full h-40 overflow-hidden">
        <img :src="prod.Images" class="w-full h-40 object-scale-down" />
        <div
          class="absolute bottom-[-50px] left-0 w-full h-10 bg-[#D9A273] text-white text-center leading-10 text-sm transition-all duration-300 group-hover:bottom-0 hidden md:block"
          @click.stop="AddToCart({ ...prod, quantity: 1 })"
        >
          加入購物車
        </div>
      </div>
      <div class="flex w-full flex-col items-start gap-2">
        <h2 class="text-[#7A7A7A]" :title="prod.Title">{{ prod.Title }}</h2>
        <hr class="w-full border border-gray-300" />
        <div class="flex w-full justify-between">
          <h2 class="text-[#D9A273] font-bold">$ {{ prod.Price }}</h2>
          <div class="flex gap-1">
            <p class="font-bold">{{ prod.Rate }}</p>
            <i class="ri-star-fill text-[#FFD85A]"></i>
          </div>
        </div>
        <div
          class="w-full h-10 bg-[#D9A273] text-white text-center leading-10 text-lg md:hidden rounded"
          @click.stop="AddToCart({ ...prod, quantity: 1 })"
        >
          加入購物車
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h2 {
  font-size: 1rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 顯示的行數 */
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
