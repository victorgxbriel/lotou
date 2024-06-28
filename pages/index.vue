<template>
    <main class="index-main">
        <div>
            <div>
                <select v-model="selectedLoteria" name="loteria">
                    <option value="megasena">MEGA-SENA</option>
                    <option value="quina">QUINA</option>
                    <option value="lotofacil">LOTOFACIL</option>
                    <option value="lotomania">LOTOMANIA</option>
                    <option value="timemania">TIME MANIA</option>
                    <option value="diadesorte">DIA DE SORTE</option>
                </select>
            </div>
            <div>
                <Icon name="mdi:clover" mode="svg" size="5em" color="white"/>
                <p>{{ selectedLoteria }}</p>
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

const selectedLoteria = ref("megasena")

const endpoint = computed(() => {
    return `https://servicebus2.caixa.gov.br/portaldeloterias/api/${selectedLoteria.value}`
})

const color = "green"
interface Teste {
    dataApuracao: string,
    listaDezenas: string[],
    numero: number
}
const {data: loteria, error, refresh } = await useFetch<Teste>(endpoint, {
    pick: ['dataApuracao' , 'listaDezenas' , 'numero']
})

const listNumbers = computed<NumberProps[]>(() => {
    return loteria.value?.listaDezenas.map((num) => {
    const n: NumberProps = {
        num: num
    }
    return n
}) || []
})
/*
 listNumbers = loteria.value?.listaDezenas.map((num) => {
    const n: NumberProps = {
        num: num
    }
    return n
}) || [] */
</script>

<style scoped >
.index-main {
    background-color: v-bind(color);
}
</style>