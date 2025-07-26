<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  products: Array<{
    Title: string
    Price: number
    Images: string
    ID: number
    Rate?: number
  }>
}>()

const router = useRouter()
const currentIndex = ref(0)
const itemsPerPage = ref(4)

// 根據螢幕寬度更新每頁顯示數量
const updateItemsPerPage = () => {
  const width = window.innerWidth
  itemsPerPage.value = width < 768 ? 2 : 4

  // 頁面數變了，修正 currentIndex
  const maxStart = Math.max(0, props.products.length - itemsPerPage.value)
  if (currentIndex.value > maxStart) {
    currentIndex.value = 0
  }
}
onMounted(() => {
  updateItemsPerPage()
  window.addEventListener('resize', updateItemsPerPage)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateItemsPerPage)
})

const currentSlide = computed(() =>
  props.products.slice(currentIndex.value, currentIndex.value + itemsPerPage.value)
)

const total = computed(() => props.products.length)

const prev = () => {
  if (currentIndex.value === 0) {
    const pages = Math.ceil(total.value / itemsPerPage.value)
    currentIndex.value = (pages - 1) * itemsPerPage.value
  } else {
    currentIndex.value = Math.max(0, currentIndex.value - itemsPerPage.value)
  }
}

const next = () => {
  if (currentIndex.value + itemsPerPage.value >= total.value) {
    currentIndex.value = 0
  } else {
    currentIndex.value += itemsPerPage.value
  }
}

const ChooseProduct = (item: any) => {
  router.push({ name: 'productdetail', params: { id: item.ID } })
}
</script>

<template>
  <div class="flex items-center gap-4 px-4">
    <i
      v-if="total > itemsPerPage"
      class="ri-arrow-left-box-fill text-[#D9A273] text-3xl cursor-pointer"
      @click="prev"
    ></i>
    <div
      class="grid gap-6 transition-all duration-500 w-full overflow-hidden"
      :class="{
        'grid-cols-2': itemsPerPage === 2,
        'grid-cols-4': itemsPerPage === 4
      }"
    >
      <div
        v-for="(item, index) in currentSlide"
        :key="index"
        class="flex flex-col gap-2 cursor-pointer w-full"
        @click="ChooseProduct(item)"
      >
        <img :src="item.Images" class="h-40 object-scale-down" />
        <p class="text-[#7A7A7A] text-sm truncate">{{ item.Title }}</p>
        <div class="flex flex-col md:flex-row w-full md:justify-between md:items-center">
          <h2 class="text-[#D9A273] font-bold">${{ item.Price }}</h2>
          <div
            class="flex gap-1 px-1 border border-[#FFD85A] rounded items-center bg-[#FFFED6] w-fit"
          >
            <p class="font-bold text-sm">{{ item.Rate }}</p>
            <i class="ri-star-fill text-[#FFD85A]"></i>
          </div>
        </div>
      </div>
    </div>

    <i
      v-if="total > itemsPerPage"
      class="ri-arrow-right-box-fill text-[#D9A273] text-3xl cursor-pointer"
      @click="next"
    ></i>
  </div>
</template>
