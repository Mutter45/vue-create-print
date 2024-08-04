<script setup lang="ts">
import { VueCreatePrint } from 'vue-create-print'
import { ref } from 'vue'

const num = ref(0)
const radio = ref('a')
function handleAfterPrint() {
  console.log('after print')
}

function handleBeforePrint() {
  console.log('before print')
  num.value += 10
  return Promise.resolve()
}
function handlePrintError(errorLocation: 'onBeforeGetContent' | 'onBeforePrint' | 'print', err: Error) {
  console.error('print error', err, errorLocation)
}
</script>

<template>
  <div>
    <VueCreatePrint
      :on-after-print="handleAfterPrint"
      :on-before-print="handleBeforePrint"
      :on-print-error="handlePrintError"
      :remove-after-print="true"
    >
      <template #default="{ handlePrint }">
        <div>
          <button class=" px-2  bg-blue-7 hover:bg-blue-5  text-white rounded mb-2" @click="handlePrint">
            print
          </button>
        </div>
      </template>
      <template #content>
        <div class="print-content">
          <h1>print content</h1>
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
      </template>
    </VueCreatePrint>
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
