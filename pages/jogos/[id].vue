<template>
    <Game :jogo="jogo" />
</template>

<script setup lang="ts">
function convertToString(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}

/*
import type { GameProps } from '~/components/game.vue';
import type { NumberProps } from '~/components/number.vue';

definePageMeta({
    layout: "user"
})

const route = useRoute()
const id = route.params.id

const { data, error, pending, status, refresh } = await useFetch("/api/megasena")


const game: GameProps = {
    name: "teste",
    numero: data.value?.numero || -1,
    listNumbers: data.value?.listaDezenas.map((num: any) => {
            const n: NumberProps = {
                num: num
            }
            return n
        }) || [],
    resultado: data.value?.listaDezenas.map((num: any) => {
            const n: NumberProps = {
                num: num
            }
            return n
        }) || [],
}
*/
const route = useRoute()
const idjogo: string = convertToString(route.params.id)
const jogo: Jogo = getJogoById(parseInt(idjogo))
</script>

<style scoped>
</style>