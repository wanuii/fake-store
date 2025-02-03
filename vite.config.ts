import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [vue()],
=======
  plugins: [
    vue(),
  ],
>>>>>>> 1ff437876c4adcfad746cfeb16da75684e82420a
  base: '/shopping-cart/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
