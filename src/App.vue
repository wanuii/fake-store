<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen gap-10">
    <Navbar />
    <div class="flex-1">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
