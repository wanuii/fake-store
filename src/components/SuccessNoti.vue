<template>
    <div class="cartBox">
        <div class="cart">
            <h3>成功加進購物車!</h3>
        </div>
    </div>
</template>
<style scoped>
.cartBox {
    display: flex;
    justify-content: center;
    width: 100%;
}

.cart {
    display: flex;
    width: 15vw;
    height: 10vh;
    background-color: black;
    border-radius: 5px;
    opacity: 0.5;
    align-items: center;
    margin-top: 10vh;
    justify-content: center;
    position: fixed;
    z-index: 1000;
}

h3 {
    color: white;
    text-align: center;
}
</style>