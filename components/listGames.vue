<template>
    <div class="game-list" v-if="jogos.length > 0">
        <GameCard v-for="jogo in jogos" :key="jogo.id" :jogo="jogo" @clicked="handleEvent(jogo.id)"/>
    </div>
    <div v-else>
        <p>Não tem jogos ainda</p>
    </div>
</template>

<script setup lang="ts">

type ListGameProps = {
    jogos: Jogo[]
}

type ListGameEvents = {
    (event: 'clicked', idx:number): void
}

const emits = defineEmits<ListGameEvents>()

const handleEvent = (idx:number) => {
    emits("clicked", idx)
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