<!-- eslint-disable no-console -->
<script setup lang="ts">
import { PrintContextConsumer, VueCreatePrint, createPrint } from 'vue-create-print'
import { ref } from 'vue'

const b = ref<number>(0)
const radio = ref<string>('a')
const contentRef = ref<HTMLDivElement | null>(null)
const handleClick = createPrint({
  content: () => contentRef.value!,
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
function handleBeforeGetContent() {
  console.log('before get content')
}
function handleBeforePrint() {
  console.log('before print')
}
function handlePrintError(errorLocation: 'onBeforeGetContent' | 'onBeforePrint' | 'print', err: Error) {
  console.error('print error', err, errorLocation)
}
</script>

<template>
  <div>
    <div ref="contentRef" class="print-content">
      <h1>print content</h1>
      <img
        alt="Google logo"
        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        width="200"
      >
      <div>{{ b }}</div>
      <div>
        <input v-model="radio" type="radio" value="a">
        <input v-model="radio" type="radio" value="b">
      </div>
    </div>
    <VueCreatePrint
      :content="() => contentRef"
      :on-before-get-content="handleBeforeGetContent"
      :on-after-print="handleAfterPrint"
      :on-before-print="handleBeforePrint"
      :on-print-error="handlePrintError"
      :show="true"
    >
      <PrintContextConsumer v-slot="{ handlePrint }">
        <div class="btn-group">
          <button class="print-btn" @click="handlePrint">
            Print this out!
          </button>
        </div>
      </PrintContextConsumer>
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
