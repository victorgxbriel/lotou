<template>
  <div class="number-container">
      <div v-for="(num, i) in listNumbers" :key="num.num" class="number-item">
          <Number :num="num.num" :match="num.match" :onRemove="props.form" @on-remove="clickRemov(num.num)" />
      </div>
  </div>
</template>

<script setup lang="ts">
import type { NumberProps } from './number.vue';

export type ListNumberProps = {
  listNumbers: NumberProps[],
  form?: boolean
}

type ListNumberEmits = {
  (event: 'remove', num: string): void
}

const props = defineProps<ListNumberProps>()
const emits = defineEmits<ListNumberEmits>()

const clickRemov = (num: string) => {
  emits('remove', num)
}


</script>

<style scoped>
.number-container {
display: flex;
flex-wrap: wrap; /* Allows wrapping to the next line if needed */
gap: 30px; /* Spacing between items */
justify-content: center; /* Center items horizontally */
}

.number-item {
display: flex;
justify-content: center;
align-items: center;
}
</style>