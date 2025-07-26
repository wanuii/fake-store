import { defineStore } from 'pinia'
type Product = {
  Title: string
  Price: number
  Images: string
  ID: number
  quantity?: number
  Rate?: number
}
type CartProduct = Product & { quantity: number }
export const useFuncStore = defineStore('cart', {
  state: () => ({
    prodspace: [] as CartProduct[],
    viewedProducts: []as Product[],
  }),

  actions: {
    addPro(product: CartProduct) {
      const existing = this.prodspace.find((p) => p.ID === product.ID)
      if (existing) {
        existing.quantity = (existing.quantity ?? 0) + (product.quantity ?? 1)
      } else {
        this.prodspace.push({ ...product, quantity: product.quantity || 1 })
      }
    },

    deletePro(product: { ID: number }) {
      const index = this.prodspace.findIndex((p) => p.ID === product.ID)
      if (index !== -1) {
        this.prodspace.splice(index, 1)
      }
    },
    clearCart() {
      this.prodspace = []
    },
    addViewedProduct(product: Product) {
      const existingIndex = this.viewedProducts.findIndex(p => p.ID === product.ID)
      if (existingIndex !== -1) {
        this.viewedProducts.splice(existingIndex, 1) // 移除舊的（讓最新的在最前面）
      }
      this.viewedProducts.unshift(product) // 加到最前面
      if (this.viewedProducts.length > 20) {
        this.viewedProducts.pop()
      }
    }
  },
  getters: {
    totalAmount: (state) =>
      state.prodspace.reduce((sum, p) => sum + (p.Price || 0) * (p.quantity || 1), 0)
  },
  persist: {
    storage: sessionStorage,
  }
})
