<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const backHome = () => {
  router.push('/')
}
</script>
<template>
  <div class="min-h-[calc(100vh-20rem)] flex flex-col gap-3 items-center justify-center mt-20">
    <p class="text-2xl">感謝您的購買!</p>
    <p class="text-2xl text-[#d9a273] cursor-pointer" @click="backHome">
      點此回到商品頁，查看更多商品
    </p>
  </div>
</template>
