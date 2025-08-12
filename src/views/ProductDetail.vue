<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { watch, ref } from 'vue'
import { useFuncStore } from '@/stores/cart.ts'
import ProductCarousel from '@/components/ProductCarousel.vue'
const cartstore = useFuncStore()
const route = useRoute()
const router = useRouter()
const product = ref<any>(null)
const num = ref(1) // 計算商品數量
const loading = ref(true) // 計算商品數量
const shopprods = ref<any[]>([]) // 放推薦商品
const allProducts = ref<any[]>([])

// 獲取全部商品
async function ensureAllProducts() {
  if (allProducts.value.length) return
  const res = await fetch('https://fakestoreapi.com/products')
  allProducts.value = await res.json()
}
// 將商品加入購物車
const AddToCart = (product: any) => {
  cartstore.addPro(product)
  ElNotification({
    title: '已新增進購物車!',
    type: 'success'
  })
}
const backHome = () => {
  router.push('/')
}
watch(
  () => route.params.id,
  async (newId) => {
    if (!newId) return
    loading.value = true
    num.value = 1 // 重設商品數量

    const res = await fetch(`https://fakestoreapi.com/products/${newId}`)
    const data = await res.json()
    product.value = {
      Title: data.title,
      Price: data.price,
      Images: data.image,
      ID: data.id,
      Description: data.description,
      Rate: data.rating.rate,
      RateCount: data.rating.count,
      Category: data.category
    }

    await ensureAllProducts()
    // 抓同類型商品（排除自己）
    const rec = allProducts.value
      .filter((p) => p.category === data.category && p.id !== data.id)
      .map((p) => ({
        Title: p.title,
        Price: p.price,
        Images: p.image, // 這裡來自 /products，全都能顯示
        ID: p.id,
        Description: p.description,
        Rate: p.rating.rate
      }))

    shopprods.value = rec
    // 瀏覽紀錄
    cartstore.addViewedProduct({
      Title: data.title,
      Price: data.price,
      Images: data.image,
      ID: data.id,
      Rate: data.rating.rate
    })

    loading.value = false
  },
  { immediate: true } // 讓初次進入頁面時也會執行一次
)
</script>
<template>
  <div class="flex flex-col mt-20 gap-20" v-loading="loading">
    <div class="flex ml-8 w-28 items-center gap-1 text-[#D9A273] cursor-pointer" @click="backHome">
      <i class="ri-arrow-go-back-fill"></i>
      <p class="font-bold">返回首頁</p>
    </div>
    <div class="flex flex-col md:flex-row max-w-4xl mx-auto gap-10 px-4 md:px-10" v-if="product">
      <img :src="product.Images" class="w-full h-64 object-scale-down" />
      <div class="flex flex-col gap-3">
        <p class="text-xl font-bold">{{ product.Title }}</p>
        <p class="text-xl text-[#D9A273] font-bold">$ {{ product.Price }}</p>
        <div class="flex items-center gap-2">
          <p>評價</p>
          <p>{{ product.Rate }}</p>
          <el-rate :model-value="product.Rate" disabled />
          <p>{{ `(${product.RateCount})` }}</p>
        </div>
        <div>
          <p class="text-xl">商品描述</p>
          <p class="mt-2">{{ product.Description }}</p>
        </div>
        <div class="flex gap-3">
          <el-input-number v-model="num" :min="1" :max="10" />
          <el-button
            class="w-36"
            style="background-color: #d9a273; color: white"
            @click="AddToCart({ ...product, quantity: num })"
            >加入購物車</el-button
          >
        </div>
      </div>
    </div>
    <hr class="border border-gray-300 mx-24" />
    <div v-if="!loading" class="flex flex-col max-w-4xl mx-auto gap-20 px-4">
      <p class="text-xl font-bold">更多你可能喜歡的商品</p>
      <ProductCarousel :products="shopprods" />
      <p class="text-xl font-bold">瀏覽紀錄</p>
      <ProductCarousel :products="cartstore.viewedProducts" />
    </div>
  </div>
</template>
<style scoped></style>
