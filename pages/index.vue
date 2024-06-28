<template>
    <main class="index-main">
        <div>
            <div>
                <input />
            </div>
            <div>
                <Icon name="mdi:clover" mode="svg" size="5em" color="white"/>
                <p>Mega-Sena</p>
            </div>
            <div>
                <p>CONCURSO</p>
                <h3>{{ loteria?.numero }} - {{ loteria?.dataApuracao }}</h3>
            </div>
        </div>
        <div>
            <ListNumber :listNumbers="listNumbers"/>
        </div>
    </main>
</template>

<script setup lang="ts">
import type { NumberProps } from '~/components/number.vue';

const color = "green"
interface Teste {
    dataApuracao: string,
    listaDezenas: string[],
    numero: number
}
const {data: loteria, error, refresh } = await useFetch<Teste>('https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena', {
    pick: ['dataApuracao' , 'listaDezenas' , 'numero']
})

const listNumbers: NumberProps[] = loteria.value?.listaDezenas.map((num) => {
    const n: NumberProps = {
        num: num
    }
    return n
}) || []
</script>

<style scoped >
.index-main {
    background-color: v-bind(color);
}
</style>