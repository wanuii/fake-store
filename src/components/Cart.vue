<script setup lang="ts">
import { ref } from 'vue'
import { useFuncStore } from "@/stores/cart.ts"

const cartstore = useFuncStore()
const products = ref(cartstore.prodspace)
// 新增商品數量
const add = (prod: { quantity: number }) => {
    prod.quantity++;
};
// 減少商品數量
const reduce = (prod: { ID: number; quantity: number }) => {
    if (prod.quantity > 1) {
        prod.quantity--;
    } else {
        cartstore.deletePro(prod)
    }
};
</script>
<template>
    <div class='content'>
        <h1 class="emptyCart" v-if="products.length === 0">購物車內還沒有任何商品哦!</h1>
        <div class="product" v-for="(prod, index) in products" :key="index">
            <img :src="prod.Images">
            <div class='detail'>
                <h2>{{ prod.Title }}</h2>
                <h2>NT$ {{ prod.Price }}</h2>
                <div class="quantity-control">
                    <button @click="reduce(prod)" class="quantity-btn">-</button>
                    <h2 class="quantity-product">{{ prod.quantity }}</h2>
                    <button @click="add(prod)" class="quantity-btn">+</button>
                </div>
                <h2 :style="{ color: 'red' }">NT$ {{ (Number(prod.Price) * prod.quantity).toFixed(2) }}</h2>
                <button class="btn" @click='cartstore.deletePro(prod)'>刪除</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.content {
    width: 100%;
    margin-top: 10vh;
    display: flex;
    text-align: center;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.emptyCart {
    position: fixed;
    top: 50vh;
    width: 100%;
}

.product {
    width: 80%;
    margin: 1vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    box-shadow: 0 6px 12px #7A7A7A;
}

img {
    margin: 1vw;
    width: 10vw;
    height: 10vw;
}

.detail {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
}

h2 {
    margin: 2vw;
    width: 10vw;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /* 顯示的行數 */
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}

.quantity-control {
    display: flex;
    align-items: center;
}

.quantity-product {
    margin: -2.5vw;
}

.quantity-btn {
    z-index: 1;
}







.btn {
    width: 100px;
    height: 60px;
    border: 0;
    background-color: #7A7A7A;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
}

.btn:hover {
    color: #003C9D;
    background-color: #fff;
    border: 2px #003C9D solid;
}
</style>