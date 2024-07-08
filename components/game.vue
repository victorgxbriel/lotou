<template>
    <div>
        <p>Feito em {{ props.jogo.createAt }}</p>
        <p> Concurso - {{ props.jogo.numero }}</p>
        <div>
            <p>Seu jogo</p>
            <ListNumber :listNumbers="jogoWithMatches.listNumbers" />
        </div>
        <div>
            <p>Resultado</p>
            <ListNumber v-if="props.jogo.resultado.length > 1" :listNumbers="props.jogo.resultado" />
            <h3 v-else>Sorteio ainda não feito</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import ListNumber from './listNumber.vue';

export type GameProps = {
    jogo: Jogo
}
const props = defineProps<GameProps>()
const jogoWithMatches = computed(() => {
    const updatedListNumbers = props.jogo.listNumbers.map(num => ({
        ...num,
        match: props.jogo.resultado.some(numResult => num.num === numResult.num)
    }));

    return {
        ...props.jogo,
        listNumbers: updatedListNumbers
    };
});

console.log(jogoWithMatches.value.listNumbers);
</script>

<style scoped></style>