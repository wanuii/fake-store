import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFuncStore = defineStore('cart', () => {
  const prodspace = ref<
    Array<{ Title: string; Price: Number; Images: string; ID: number; quantity: number }>
  >([]) // 購物車商品
  // 加入購物車
  const addPro = (product: {
    Title: string
    Price: Number
    Images: string
    ID: number
    quantity: number
  }) => {
    const prodExist = prodspace.value.find((p) => p.ID === product.ID)
    if (prodExist) {
      prodExist.quantity++
    } else {
      prodspace.value.push({ ...product, quantity: 1 })
    }
  }
  // 從購物車刪除
  const deletePro = (product: { ID: number }) => {
    const index = prodspace.value.findIndex((p) => p.ID === product.ID)
    if (index !== -1) {
      prodspace.value.splice(index, 1)
    }
  }

  return { prodspace, addPro, deletePro }
})
