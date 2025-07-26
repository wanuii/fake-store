# Fake Store

Fake Store 是一款以 Vue 3 製作的電商頁面，整合商品瀏覽、分類篩選、購物車、結帳流程與瀏覽紀錄等功能，並透過 [FakeStore API](https://fakestoreapi.com/) 取得商品資料，模擬完整購物流程。

---

## ✨ 功能特色

- **商品列表**：以卡片方式展示商品資訊，支援分類選擇與 API 即時取得。
- **商品詳情**：點擊商品可進入詳情頁，顯示圖片、描述、評價與加入購物車操作。
- **購物車管理**：使用者可調整商品數量、刪除商品並自動計算總金額。
- **結帳流程**：內建信用卡資訊填寫表單，含驗證邏輯與假結帳流程模擬。
- **瀏覽紀錄**：自動記錄曾看過的商品，方便再次查看。
- **響應式設計**：針對手機與桌面介面調整，提供良好使用體驗。
- **狀態管理**：使用 Pinia 實作購物車與瀏覽紀錄儲存，並搭配 sessionStorage 保留資料。

---

## 🛠 技術棧

| 類別     | 使用技術                                                  |
| -------- | --------------------------------------------------------- |
| 前端框架 | Vue 3 (Composition API + TypeScript)                      |
| UI 框架  | Element Plus                                              |
| 狀態管理 | Pinia + pinia-plugin-persistedstate                       |
| 路由管理 | Vue Router                                                |
| 樣式工具 | Tailwind CSS、Bootstrap Icons、Remix Icon                 |
| 資料串接 | RESTful API（[FakeStore API](https://fakestoreapi.com/)） |
| 開發工具 | Vite、Prettier、ESLint                                    |
| 部署平台 | Vercel                                                    |

---

## ⚙️ 安裝步驟

請先安裝 [Node.js](https://nodejs.org/) 與 [npm](https://www.npmjs.com/)，接著執行以下指令：

```bash
git clone https://github.com/wanuii/task-content-designer.git
cd fake-store
npm install
```

---

## ▶️ 啟動方式

```bash
npm run dev
```

## 網頁展示

<https://wanuii.github.io/shopping-cart/>
