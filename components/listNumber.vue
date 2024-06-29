<template>
  <div class="number-container">
      <div v-for="(num, i) in listNumbers" :key="num.num" class="number-item">
          <Number :num="num.num" :match="num.match"/>
      </div>
  </div>
</template>

<script setup lang="ts">
import type { NumberProps } from './number.vue';

export type ListNumberProps = {
  listNumbers: NumberProps[]
}

const props = defineProps<ListNumberProps>()

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