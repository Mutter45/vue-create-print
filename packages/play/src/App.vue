<script setup lang="ts">
import { PrintContextConsumer, VueCreatePrint } from 'vue-create-print'
import { ref } from 'vue'

const b = ref<number>(0)
const contentRef = ref<HTMLDivElement | null>(null)
// const print = createPrint({
//   content: () => contentRef.value,
//   onPrintSuccess: () => console.log('print success'),
//   onPrintError: err => console.error('print error', err),
// })
</script>

<template>
  <div>
    <div ref="contentRef">
      <div>{{ b }}</div>
      <button @click="b++">
        add
      </button>
    </div>
    <VueCreatePrint :content="() => contentRef">
      <!-- <template #content>
        <div>
          <h1>21312312</h1>
        </div>
      </template> -->
      <PrintContextConsumer v-slot="{ handlePrint }">
        <button @click="handlePrint">
          Print this out!
        </button>
      </PrintContextConsumer>
    </VueCreatePrint>
  </div>
</template>
