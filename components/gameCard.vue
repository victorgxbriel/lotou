<template>
    <div class="card" :style="{ backgroundColor: jogo.loteria.cor }">
        <h3>{{ jogo.name }}</h3>
        <p>Loteria: {{ jogo.loteria.nome }}</p>
        <p>Concurso Nº: {{ jogo.numero }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Jogo } from '~/server/api/jogos/index.get';

export type GameProps = {
    jogo: Jogo
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