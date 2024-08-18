# vue-create-print

Printing functionality supporting Vue 3.x and Vue 2.7.x

## Design Inspiration

First, many thanks to [`react-to-print`](https://github.com/MatthewHerbst/react-to-print). The printing functionality of this project is greatly inspired by its implementation, adjusted to incorporate Vue and related features.

Existing printing plugins in the Vue ecosystem were not satisfactory, hence this plugin was developed. It supports both Vue 2 and Vue 3, leveraging [`vue-demi`](https://github.com/vueuse/vue-demi).

## Installation

```bash
npm install vue-create-print
```

## Usage as a Component

``` ts
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
function handlePrintError(errorLocation: 'onBeforePrint' | 'print', err: Error) {
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
          <button class=" px-2 bg-green-5 hover:bg-green-3 rounded mb-2" @click="handlePrint">
            打 印
          </button>
        </div>
      </template>
      <template #content>
        <div class="print-content">
          <h1>打印内容</h1>
          <img alt="vue-create-print logo" src="/logo.svg" width="200">
          <div>{{ num }}</div>
          <div class="flex">
            <button class="px-2 bg-green-5 hover:bg-green-3 rounded" @click="num++">
              +
            </button>
            <button class="ml-2 px-2 bg-green-5 hover:bg-green-3 rounded" @click="num--">
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
```
## Usage as a Function

``` ts
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
      <button class="px-2 bg-green-5 hover:bg-green-3 rounded mb-2" @click="handlePrint">
        打 印
      </button>
    </div>
    <div ref="contentRef" class="print-content">
      <h1>打印内容</h1>
      <img alt="vue-create-print logo" src="/logo.svg" width="200">
      <div>{{ num }}</div>
      <div class="flex">
        <button class="px-2 bg-green-5 hover:bg-green-3 rounded" @click="num++">
          +
        </button>
        <button class="ml-2 px-2 bg-green-5 hover:bg-green-3 rounded" @click="num--">
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
```
