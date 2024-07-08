<template>
    <div class="card" :style="{ backgroundColor: jogo.loteria.cor }" @click="$emit('clicked')">
        <h3>{{ jogo.name }}</h3>
        <p>Loteria: {{ jogo.loteria.nome }}</p>
        <p>Concurso Nº: {{ jogo.numero }}</p>
    </div>
</template>

<script setup lang="ts">

export type GameProps = {
    jogo: Jogo
}

type GameEvents = {
    (event: 'clicked'): void
}

const props = defineProps<GameProps>();
</script>

<style scoped>
.card {
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #fff;
}
</style>