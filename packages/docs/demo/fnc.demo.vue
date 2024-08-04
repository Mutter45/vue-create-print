<script setup lang="ts">
import { createPrint } from 'vue-create-print'
import { ref } from 'vue'

const num = ref(0)
const radio = ref('a')
const contentRef = ref<HTMLDivElement>()

const handlePrint = createPrint({
  content: () => contentRef.value,
  onAfterPrint: () => {
    console.log('after print')
  },
  onBeforePrint: () => {
    console.log('before print')
    num.value += 10
    return Promise.resolve()
  },
  onPrintError: (errorLocation, err) => {
    console.error('print error', err, errorLocation)
  },
  preserveAfterPrint: true,
})
</script>

<template>
  <div>
    <div>
      <button class="px-2  bg-blue-7 hover:bg-blue-5  text-white rounded mb-2" @click="handlePrint">
        打 印
      </button>
    </div>
    <div ref="contentRef" class="print-content">
      <h1>打印内容</h1>
      <img alt="Google logo" src="/logo.svg" width="200">
      <div>{{ num }}</div>
      <div class="flex">
        <button class="px-2 bg-blue-7 hover:bg-blue-5  text-white rounded" @click="num++">
          +
        </button>
        <button class="ml-2 px-2 bg-blue-7 hover:bg-blue-5  text-white rounded" @click="num--">
          -
        </button>
      </div>
      <div>
        <input v-model="radio" type="radio" value="a">
        <input v-model="radio" type="radio" value="b">
      </div>
    </div>
  </div>
</template>

<style scoped>
.print-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px;
}

.btn-group {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
