<template>
    <div>
        <h3>{{ jogo.name }}</h3>
        <p>Feito em {{ jogo.createAt }}</p>
        <p> Concurso - {{ jogo.numero }}</p>
        <div>
            <p>Seu jogo</p>
            <ListNumber :listNumbers="jogo.listNumbers"/>
        </div>
        <div>
            <p>Resultado</p>
            <ListNumber v-if="jogo.resultado.length < 1" :listNumbers="jogo.resultado" />
            <h3 v-else>Sorteio ainda não feito</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import ListNumber from './listNumber.vue';
import type { Jogo } from '~/server/api/jogos/index.get';


export type GameProps = {
    jogo: Jogo
}

const props = defineProps<GameProps>()

</script>

<style scoped>
</style>