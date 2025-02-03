<script setup lang="ts">
import { defineProps, watch, ref } from 'vue';
import { useFuncStore } from "@/stores/cart.ts";

const cartstore = useFuncStore()
const props = defineProps({
    product: {
        type: Object as () => any,
        required: true,
    },
});
const product = ref(props.product); // 商品資料
const state = ref(false); // 關閉狀態
const emit = defineEmits(['change-dialog-state'])
// 將商品加入購物車
const AddToCart = () => {
    cartstore.addPro(product.value);
    emit('change-dialog-state', state);  // 傳遞【關閉狀態】，將【商品描述】元件關閉
}
// 監聽是否點擊其他商品
watch(() => props.product, (newProd, oldProd) => {
    product.value = newProd
});
</script>
<template>
    <div class="detail">
        <img :src="product.Images">
        <div class="description">
            <h2>{{ product.Title }}</h2>
            <h2>NT$ {{ product.Price }}</h2>
            <h3>{{ product.Description }}</h3>
        </div>
    </div>
    <button type="button" class="btn" @click="AddToCart()">加入購物車</button>
</template>
<style scoped>
.detail {
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 15vh;
}

img {
    width: 20vw;
    height: 20vw;
    margin: 2vw;
}

.description {
    display: flex;
    width: 60vw;
    flex-direction: column;
    text-align: left;
}

h3 {
    color: black;
    text-align: left;
}

.btn {
    font-size: large;
    width: 20vw;
    height: 3vw;
    border: none;
    color: white;
    background-color: #7A7A7A;
    position: absolute;
    bottom: 2vw;
    right: 2vw;
}
</style>