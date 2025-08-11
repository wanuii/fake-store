<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import FrontCover from '@/components/FrontCover.vue'
import ProductCard from '@/components/ProductCard.vue'

// ============== 變數存放區 ==============
const loading = ref(true)
// 放置查到的資料內容
const shopprods = ref<
  Array<{
    Title: string
    Price: number
    Images: string
    ID: number
    Description: string
    Rate: number
  }>
>([])
const detial = ref(false) // 判斷是否開啟商品詳細
let state = ref<'all' | string>('all') // 商品類別
const allProducts = ref<any[]>([])
const categoryMap: Record<string, string> = {
  all: '全部',
  electronics: '電子產品',
  jewelery: '飾品',
  "men's clothing": '男裝',
  "women's clothing": '女裝'
}
// =============================================
// 分類API有問題，圖片顯示錯誤，故不打分類 API
// 由全部商品動態推導分類清單
const categories = computed<string[]>(() => {
  const set = new Set(allProducts.value.map((p) => p.category))
  return ['all', ...Array.from(set)]
})

// 只抓一次「全部商品」
const fetchAllProducts = async () => {
  try {
    loading.value = true
    const res = await fetch('https://fakestoreapi.com/products')
    allProducts.value = await res.json()
  } catch (err) {
    console.log('error', err)
  } finally {
    loading.value = false
  }
}

function applyFilter(category: string) {
  const list =
    category === 'all'
      ? allProducts.value
      : allProducts.value.filter((p) => p.category === category)

  shopprods.value = list.map((p) => ({
    Title: p.title,
    Price: p.price,
    Images: p.image,
    ID: p.id,
    Description: p.description,
    Rate: p.rating?.rate ?? 0
  }))
}

// 點分類時前端 filter
function onCategoryClick(category: string) {
  state.value = category
  applyFilter(category)
}

onMounted(async () => {
  detial.value = false
  await fetchAllProducts()
  applyFilter('all')
})
</script>
<template>
  <div v-loading="loading">
    <FrontCover />
    <hr class="border border-gray-300 my-10 mx-24" />
    <div class="flex flex-col gap-8 max-w-4xl mx-auto px-4">
      <div class="flex flex-wrap w-full gap-8 justify-center">
        <div
          class="category cursor-pointer relative text-[#7A7A7A] text-2xl"
          v-for="(category, index) in categories"
          :key="index"
          @click="onCategoryClick(category)"
          :class="{
            'active-category': state === category
          }"
        >
          {{ categoryMap[category] || category }}
        </div>
      </div>
      <div class="flex mb-10 text-2xl text-[#D9A273]">
        {{ categoryMap[state] || state }}
      </div>
      <ProductCard :shopprods="shopprods" />
    </div>
  </div>
</template>
<style scoped>
.category::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #d9a273;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.category:hover::before {
  transform: scaleX(1);
}
.active-category {
  color: #d9a273;
}
.active-category::before {
  transform: scaleX(1);
}
</style>
