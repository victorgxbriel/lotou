<template>
    <div class="lottery-ball">
        <p>{{ num }}</p>
    </div>
</template>

<script setup lang="ts">

export type NumberProps = {
    num: string,
    match?: boolean
}

const props = defineProps<NumberProps>()

</script>

<style scoped>
.lottery-ball {
  width: 4vmax;
  height: 4vmax;
  background-color: #ffffff; /* Gold color */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1vmax;
  font-weight: bold;
  color: #000000;
}
</style>