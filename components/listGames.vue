<template>
    <div class="game-list" v-if="jogos.length > 0">
        <GameCard v-for="jogo in jogos" :key="jogo.id" :jogo="jogo"/>
    </div>
    <div v-else>
        <p>Não tem jogos ainda</p>
    </div>
</template>

<script setup lang="ts">
import type { Jogo } from '~/server/api/jogos/index.get';


type ListGameProps = {
    jogos: Jogo[]
}

const props = defineProps<ListGameProps>()

</script>

<style scoped>
.game-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>