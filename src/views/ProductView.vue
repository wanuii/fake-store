<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
let state = 'all' // 商品類別
const categoryMap: Record<string, string> = {
  all: '全部',
  electronics: '電子產品',
  jewelery: '飾品',
  "men's clothing": '男裝',
  "women's clothing": '女裝'
}
// =============================================
// 所有商品
const onSearch = async (state: string) => {
  try {
    loading.value = true
    shopprods.value = []
    let res
    if (state == 'all') {
      res = await fetch(`https://fakestoreapi.com/products`)
    } else {
      res = await fetch(`https://fakestoreapi.com/products/category/${state}`)
    }
    const data = await res.json()
    // 把資料放進shopprods
    for (let i = 0; i < data.length; i++) {
      shopprods.value.push({
        Title: data[i].title,
        Price: data[i].price,
        Images: data[i].image,
        ID: data[i].id,
        Description: data[i].description,
        Rate: data[i].rating.rate
      })
    }
  } catch (err) {
    console.log('error', err)
  } finally {
    loading.value = false
  }
}
// 商品分類
const Categories = async () => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/categories`)
    let data = await res.json()
    data = ['all', ...data]
    categories.value = data
  } catch (err) {
    console.log('error', err)
  }
}
// 選擇【商品分類】查詢
const onCategoryClick = (category: string) => {
  state = category
  onSearch(category)
}
const categories = ref([])
onMounted(async () => {
  detial.value = false // 預設不顯示商品描述
  await Categories()
  await onSearch(state)
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
