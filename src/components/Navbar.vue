<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useFuncStore } from "@/stores/cart.ts"
import { computed } from 'vue'

const cartstore = useFuncStore()
// 計算購物車內有幾樣商品
const cartItemCount = computed(() => {
    return cartstore.prodspace.length;
});
</script>
<template>
    <nav class="navbar navbar-shadow">
        <div class="container-fluid">
            <div class="navbar-header">
                <RouterLink to="/" class="navbar-brand">
                    FAKESTORE
                </RouterLink>
            </div>
            <div class="nav navbar-nav">
                <RouterLink to="/shoppingcart">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#7A7A7A" class="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    {{ cartItemCount }}
                </RouterLink>
            </div>
        </div>
    </nav>
</template>
<style scoped>
.navbar {
    background-color: white;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.navbar-shadow {
    box-shadow: 0 6px 12px #7A7A7A;
}

.container-fluid {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar-header {
    display: inline-block;
}

.navbar-brand {
    color: #7A7A7A;
    font-size: 2.5em;
}

.nav {
    display: inline-block;
    margin-right: 3vw;
}

.navbar-nav svg {
    width: 40px;
}
</style>