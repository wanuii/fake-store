<script setup lang="ts">
import { ref } from 'vue'
import { useFuncStore } from '@/stores/cart.ts'
import type { ElInput } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
const router = useRouter()
const cartstore = useFuncStore()
const loading = ref(false)
const formData = ref({
  name: '',
  expMonth: '',
  expYear: '',
  cardParts: ['', '', '', ''],
  cvn: '',
  tel: ''
})

const formRef = ref<FormInstance | null>(null)
const validateExpDate = (_rule: any, _value: any, callback: (error?: Error) => void) => {
  if (!formData.value.expMonth || !formData.value.expYear) {
    callback(new Error('請選擇有效年月'))
  } else {
    callback()
  }
}
const rules = {
  name: [{ required: true, message: '請輸入持卡人姓名' }],
  cardParts: [
    {
      validator: (_rule: any, value: string[], callback: (error?: Error) => void) => {
        if (value.every((part: string) => part.length === 4)) {
          callback()
        } else {
          callback(new Error('請完整輸入卡號'))
        }
      },
      trigger: 'blur'
    }
  ],
  cvn: [
    { required: true, message: '請輸入信用卡背面末三碼' },
    {
      validator: (_rule: any, value: string, callback: (error?: Error) => void) => {
        if (!/^\d{3}$/.test(value)) {
          callback(new Error('請輸入 3 位數字'))
        } else {
          callback()
        }
      }
    }
  ],
  tel: [{ required: true, message: '請輸入電話號碼' }]
}
// 過濾所有非數字
const keepOnlyDigits = (val: string | Event, callback: (cleaned: string) => void): void => {
  const value = typeof val === 'string' ? val : (val.target as HTMLInputElement).value

  const digits = value.replace(/\D/g, '')
  callback(digits)
}

const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: 10 }, (_, i) => String(currentYear + i))
const cardRefs = ref<Array<InstanceType<typeof ElInput>>>([])
const setCardRef = (el: InstanceType<typeof ElInput> | null) => {
  if (el) cardRefs.value.push(el)
}
const moveToNextCardInput = (index: number) => {
  const val = formData.value.cardParts[index]
  if (val.length === 4 && index < 3) {
    cardRefs.value[index + 1]?.focus()
  }
}
const sendOrder = async () => {
  const valid = await formRef.value?.validate()
  if (valid) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      cartstore.clearCart()
      router.push('/order-success') // 跳轉頁面
    }, 5000)
  } else {
    ElNotification({
      title: '表單驗證失敗，請確認資訊是否正確',
      type: 'error'
    })
  }
}
</script>
<template>
  <div
    class="mt-20 flex flex-col max-w-4xl mx-auto px-4"
    v-loading="loading"
    element-loading-text="資料驗證中，請稍候..."
  >
    <p class="text-[#7A7A7A] text-2xl">填寫資料</p>
    <div class="border p-3 mt-5">
      <div class="flex gap-3">
        <p>本筆訂單需付款金額</p>
        <span class="text-[#FF0000]">$ {{ cartstore.totalAmount }}</span>
      </div>
      <el-form
        class="mt-10"
        ref="formRef"
        :rules="rules"
        :model="formData"
        label-width="140px"
        label-position="left"
      >
        <el-form-item field="name" label="持卡人姓名" required prop="name">
          <el-input
            style="width: 240px"
            v-model="formData.name"
            placeholder="請輸入持卡人姓名"
            allow-clear
          />
        </el-form-item>
        <el-form-item field="cardParts" label="信用卡卡號" required prop="cardParts">
          <div class="flex gap-2 items-center">
            <template v-for="(num, index) in formData.cardParts" :key="index">
              <div class="flex md:w-[60px] justify-center items-center">
                <el-input
                  v-model="formData.cardParts[index]"
                  maxlength="4"
                  :ref="setCardRef"
                  @input="
                    (val: string | Event) => {
                      keepOnlyDigits(val, (v) => {
                        formData.cardParts[index] = v
                        moveToNextCardInput(index)
                      })
                    }
                  "
                />
              </div>
              <span v-if="index < 3">-</span>
            </template>
          </div>
        </el-form-item>
        <el-form-item
          label="信用卡有效年月"
          prop="expMonth"
          :rules="[{ validator: validateExpDate, trigger: 'change' }]"
          required
        >
          <div class="flex gap-2 items-center">
            <el-select v-model="formData.expMonth" placeholder="月" filterable>
              <el-option
                v-for="month in 12"
                :key="month"
                :label="String(month).padStart(2, '0')"
                :value="String(month).padStart(2, '0')"
              />
            </el-select>
            <span>月</span>
            <el-select v-model="formData.expYear" placeholder="年" class="w-[60px] sm:w-[70px]">
              <el-option v-for="year in yearOptions" :key="year" :label="year" :value="year" />
            </el-select>
            <span>年</span>
          </div>
        </el-form-item>

        <el-form-item field="cvn" label="信用卡背面末三碼" required prop="cvn">
          <el-input
            style="width: 70px"
            v-model="formData.cvn"
            type="tel"
            maxlength="3"
            allow-clear
            @input="(val: string | Event) => keepOnlyDigits(val, (v) => (formData.cvn = v))"
          />
        </el-form-item>
        <el-form-item field="tel" label="手機號碼" required prop="tel">
          <el-input
            style="width: 240px"
            v-model="formData.tel"
            type="tel"
            allow-clear
            @input="(val: string | Event) => keepOnlyDigits(val, (v) => (formData.tel = v))"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="flex justify-center mt-10 mb-1">
      <el-button
        style="background-color: #d9a273; color: white; transform: scale(1.2)"
        @click="sendOrder"
        >確認送出</el-button
      >
    </div>
  </div>
</template>
<style scoped>
::v-deep(.el-form-item__label) {
  margin-right: 20px;
}
</style>
