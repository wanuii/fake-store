<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductDetail from '../views/ProductDetail.vue'
import SuccessNoti from '../components/SuccessNoti.vue'
// ============== 變數存放區 ==============
// 放置查到的資料內容
const shopprods = ref<Array<{ Title: string; Price: number; Images: string; ID: number; Description: string; }>>([]);
const detial = ref(false) // 判斷是否開啟商品詳細
const selectedProduct = ref({}) // 選擇的商品資料
const addSuccess = ref(false) // 【成功加入購物車】提示視窗
let state = 'all'; // 商品類別
// =============================================
// 所有商品
const onSearch = async (state: string) => {
  try {
    shopprods.value = [];
    let res;
    if (state == 'all') {
      res = await fetch(`https://fakestoreapi.com/products`);
    } else {
      res = await fetch(`https://fakestoreapi.com/products/category/${state}`);
    }
    const data = await res.json();
    // 把資料放進shopprods
    for (let i = 0; i < data.length; i++) {
      shopprods.value.push({
        Title: data[i].title,
        Price: data[i].price,
        Images: data[i].image,
        ID: data[i].id,
        Description: data[i].description,
      });
    }
  } catch (err) {
    console.log('error', err);
  }
}
// 商品分類
const Categories = async () => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/categories`);
    let data = await res.json();
    data = ["all", ...data];
    categories.value = data;
  } catch (err) {
    console.log('error', err);
  }
}
// 選擇【商品分類】查詢
const onCategoryClick = (category: string) => {
  state = category;
  onSearch(category);
};
const categories = ref([]);
// 點擊商品，展示商品描述
const ChooseProduct = (ProductDetil: object) => {
  selectedProduct.value = ProductDetil; // 商品資料傳入【商品描述】元件
  detial.value = true; // 開啟商品描述
}
// 在【商品描述】元件點擊加入購物車後，執行程式
function changeDialogState(data: { value: boolean }) {
  detial.value = data.value; // 將【商品描述】元件關閉
  addSuccess.value = true; // 開啟【成功加入購物車】提示視窗
  setTimeout(() => {
    addSuccess.value = false;
  }, 1000);
}
onMounted(async () => {
  detial.value = false; // 預設不顯示商品描述
  await Categories()
  await onSearch(state)
})
</script>
<template>
  <SuccessNoti v-if="addSuccess" />
  <div class="viewBox">
    <div class="viewDetial" v-if="detial">
      <button type="button" class="btn" @click="detial = false">×</button>
      <ProductDetail :product="selectedProduct" @change-dialog-state="changeDialogState" />
    </div>
  </div>
  <div class="categoryBox">
    <div class="category" v-for="(category, index) in categories" :key="index" @click="onCategoryClick(category)">
      {{ category }}
    </div>
  </div>
  <div class="stateBox">
    <div class="state">
      {{ state }}
    </div>
  </div>
  <div class='content'>
    <div class='shopprods' v-for="(prod, index) in shopprods" :key="index" @click="ChooseProduct(prod)">
      <img :src="prod.Images">
      <div class='detail'>
        <h2>{{ prod.Title }}</h2>
        <h2>NT$ {{ prod.Price }}</h2>
      </div>
    </div>
  </div>
</template>
<style scoped>
.categoryBox {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}

.category {
  font-size: x-large;
  margin: 1vw;
}

.category {
  position: relative;
  cursor: pointer;
  color: black;
  text-decoration: none;
  padding-bottom: 3px;
}

.category::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #7A7A7A;
  transform-origin: left;
  /* 添加過渡效果 */
  transition: transform 0.3s ease, width 0.3s ease;
}

.category:hover::before {
  /* 滑鼠懸停時顯示完整的底線效果 */
  transform: scaleX(1);
  /* 讓底線逐漸擴展到100%寬度 */
  width: 100%;
}


.stateBox {
  display: flex;
  width: 100%;
  justify-content: center;
}

.state {
  font-size: xx-large;
  margin: 3vw;
}

.content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 2vw;
  text-align: center;
  justify-content: center;
}

.viewBox {
  display: flex;
  justify-content: center;
  margin-top: 20vh;
}

.viewDetial {
  background-color: white;
  position: fixed;
  width: 90%;
  height: 70vh;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

/* 關閉【商品描述】按鈕 */
.btn {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 50px;
  position: absolute;
  top: 1vw;
  right: 1vw;
}

h2 {
  font-size: 1.5vw;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 顯示的行數 */
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

img {
  width: 12vw;
  height: 12vw;
  margin-top: 10px;
  margin-bottom: 10px;
}

/* 商品資訊 */
.shopprods {
  display: flex;
  float: left;
  width: 20vw;
  height: 20vw;
  margin: 1vw;
  flex-direction: column;
  align-items: center;
  /* 添加過渡效果 */
  transition: box-shadow 0.3s ease;
}

.shopprods:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.detail {
  text-align: left;
  width: 100%;
  height: 20%;
}
</style>