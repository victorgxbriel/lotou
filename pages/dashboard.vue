<template>
    <main class="index-main">
        <LoteriaSVG :name="selectedLoteria.nome"
            :color="selectedLoteria.cor" :numero="loteria?.numero.toString() || ''"
            :dataApuracao="loteria?.dataApuracao || ''" />
        <div class="draw-numbers">
            <ListNumber :listNumbers="listNumbers"/>
        </div>
    </main>
</template>

<script setup lang="ts">
import type { NumberProps } from '~/components/number.vue';
import loteriasJSON from "../public/assets/loterias.json";

definePageMeta({
    layout: "logado"
})

export interface loteriaItem {
    endpoint: string,
    name: string,
    color: string
}

interface Teste {
    dataApuracao: string,
    listaDezenas: string[],
    numero: number
}

// let loterias2 = new Map<string, loteriaItem>()
// loteriasJSON.forEach(item => {
//     loterias.set(item.id, {
//         endpoint: item.endpoint,
//         name: item.nome,
//         color: item.cor
//     })
// });


const loterias: Loteria[] = useLoteria()
const selectedLoteria = ref<Loteria>(loterias[0])

provide("select-loteria", {
    selectedLoteria,
    loterias
})

const { data: loteria, execute, pending, status} = await useLazyAsyncData<Teste>("loterias-info", 
async () => ($fetch(`https://servicebus2.caixa.gov.br/portaldeloterias/api/${selectedLoteria.value.endpoint}`)),
{
    watch: [selectedLoteria],
    pick: ['dataApuracao', 'listaDezenas', 'numero']
})

const listNumbers = computed<NumberProps[]>(() => {
    return loteria.value?.listaDezenas.map((num) => {
    const n: NumberProps = {
        num: num
    }
    return n
}) || []
})

</script>

<style scoped>
.index-main {
    background-color: #EFEFEF;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100vh;
    width: 100%;
    color: white
}
.draw-numbers {
    background-color:#EFEFEF;
    width: 60%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>