<!-- eslint-disable no-console -->
<script setup lang="ts">
import { VueCreatePrint, createPrint } from 'vue-create-print'
import { ref } from 'vue'

const b = ref(0)
const radio = ref('a')
const contentRef = ref<HTMLDivElement>()
const handleClick = createPrint({
  content: () => contentRef.value,
  onBeforePrint: () => {
    console.log('before print')
    return Promise.resolve()
  },
  onAfterPrint: () => {
    console.log('print success')
  },
  onPrintError: (errorLocation: 'onBeforeGetContent' | 'onBeforePrint' | 'print', err: Error) => {
    console.error('print error', errorLocation, err)
  },
})
function handleAfterPrint() {
  console.log('after print')
}

function handleBeforePrint() {
  console.log('before print')
  b.value += 10
  return Promise.resolve()
}
function handlePrintError(errorLocation: 'onBeforePrint' | 'print', err: Error) {
  console.error('print error', err, errorLocation)
}
</script>

<template>
  <div>
    <VueCreatePrint
      :content="() => contentRef"
      :on-before-print="handleBeforePrint"
      :on-after-print="handleAfterPrint"
      :on-print-error="handlePrintError"
      :show="true"
    >
      <template #content>
        <div class="print-content">
          <h1>print content</h1>
          <img
            alt="Google logo"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            width="200"
          >
          <div>{{ b }}</div>
          <p>ceshi</p>
          <div>
            <input v-model="radio" type="radio" value="a">
            <input v-model="radio" type="radio" value="b">
          </div>
        </div>
      </template>
      <template #default="{ handlePrint }">
        <div class="btn-group">
          <button class="print-btn" @click="handlePrint">
            Print this out!
          </button>
        </div>
      </template>
    </VueCreatePrint>
    <button class="print-btn" @click="handleClick">
      function Print
    </button>
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
  h1 {
    color: red;
  }
}
.btn-group {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
