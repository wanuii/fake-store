<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <Navbar />
  <div class="router-view-wrapper">
    <RouterView />
  </div>
</template>
<style>
.router-view-wrapper {
  padding-top: 60px;
  /* 根據 Navbar 高度設定 */
}
</style>