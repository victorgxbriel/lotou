<template>
    <main class="index-main">
        <LoteriaSVG :name="loterias.get(selectedLoteria)?.name || '' " :color="loterias.get(selectedLoteria)?.color || ''" :numero="loteria?.numero.toString() || ''" :dataApuracao="loteria?.dataApuracao || ''"/>
        <div class="draw-numbers">
            <ListNumber :listNumbers="listNumbers"/>
        </div>
    </main>
</template>

<script setup lang="ts">
import type { NumberProps } from '~/components/number.vue';
import loteriasJSON from "../public/assets/loterias.json";

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

let loterias = new Map<string, loteriaItem>()
loteriasJSON.forEach(item => {
    loterias.set(item.id, {
        endpoint: item.endpoint,
        name: item.name,
        color: item.color
    })
});

const selectedLoteria = ref("megasena")

provide("selects", {
    selectedLoteria,
    loteriasJSON
})

const { data: loteria, execute, pending, status} = await useLazyAsyncData<Teste>("loterias-info", 
async () => ($fetch(`https://servicebus2.caixa.gov.br/portaldeloterias/api/${loterias.get(selectedLoteria.value)?.endpoint}`)),
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