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
type State = { prodspace: CartProduct[]; viewedProducts: Product[] }
const toCents = (n: number | undefined) =>
  Math.round(((n ?? 0) + Number.EPSILON) * 100)
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
    // 只寫 state 一個參數，並標注型別避免 implicit any
    totalAmountCents: (state: State): number =>
      state.prodspace.reduce<number>(
        (sum, p) => sum + toCents(p.Price) * (p.quantity ?? 1),
        0
      ),
    totalAmount(): number {
      return this.totalAmountCents / 100
    },
  },
  persist: {
    storage: sessionStorage,
  }
})
