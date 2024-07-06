<template>
    <main class="index-main">
        <LoteriaSVG :name="selectedLoteria.nome"
            :color="selectedLoteria.cor" :numero="loteria?.numero.toString() || ''"
            :dataApuracao="loteria?.dataApuracao || ''" />
        <div class="draw-numbers">
            <ListNumber :listNumbers="listNumbers" />
        </div>
    </main>
</template>

<script setup lang="ts">
import type { NumberProps } from '~/components/number.vue';

const selectedLoteria2 = ref("megasena")

const loterias: Loteria[] = useLoteria()
const selectedLoteria = ref<Loteria>(loterias[0])

provide("select-loteria", {
    selectedLoteria,
    loterias
})
    
const { data: loteria, execute } = await useLazyAsyncData<ResponseLoterias>("loterias-info",
    async () => {
        return await ($fetch(`https://servicebus2.caixa.gov.br/portaldeloterias/api/${selectedLoteria.value.endpoint}`))
        //return res
    },
    {
        watch: [selectedLoteria],
        pick: ['dataApuracao', 'listaDezenas', 'numero'],
        server: false
    }
)

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
    background-color: #EFEFEF;
    width: 60%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>