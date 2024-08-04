# vue-create-print

打印功能支持 vue3.x 和 vue2.7.x

## 设计来源

首先感谢 [`react-to-print`](https://github.com/MatthewHerbst/react-to-print) ,本项目的打印功能极大地参考了其实现方式，并结合Vue等相关特性进行了调整。

由于现有Vue生态的打印插件功能都不太理想，所以本插件应运而生， 并依赖 [`vue-demi`](https://github.com/vueuse/vue-demi)实现对Vue2和Vue3的支持！

## 安装

```bash
npm install vue-create-print
```

## Component方式使用

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
          <button class=" px-2  bg-blue-7 hover:bg-blue-5  text-white rounded mb-2" @click="handlePrint">
            打 印
          </button>
        </div>
      </template>
      <template #content>
        <div class="print-content">
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
      </template>
    </VueCreatePrint>
  </div>
</template>
```
## Function方式使用

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
```
