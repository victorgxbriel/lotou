<template>
    <main class="index-main">
        <div class="svg-container">
            <svg class="loteria" width="100%" height="100%" viewBox="0 0 613 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M613 0C613 0 361.26 501.011 613 1080H0V0H613Z" :fill="loterias.get(selectedLoteria)?.color"/>
            </svg>
            <div class="container-loteria">
                <div class="select-loteria">
                    <select v-model="selectedLoteria" name="loteria">
                        <option value="megasena">MEGA-SENA</option>
                        <option value="quina">QUINA</option>
                        <option value="lotofacil">LOTOFACIL</option>
                        <option value="lotomania">LOTOMANIA</option>
                        <option value="timemania">TIME MANIA</option>
                        <option value="diadesorte">DIA DE SORTE</option>
                    </select>
                </div>
                <div class="info-loteria">
                    <Icon name="mdi:clover" mode="svg" class="icon" color="white"/>
                    <p>{{ loterias.get(selectedLoteria)?.name }}</p>
                </div>
                <div class="concurso-loteria">
                    <p>CONCURSO</p>
                    <h3>{{ loteria?.numero }} - {{ loteria?.dataApuracao }}</h3>
                </div>
            </div>
        </div>
        <div class="draw-numbers">
            <ListNumber :listNumbers="listNumbers"/>
        </div>
    </main>
</template>

<script setup lang="ts">
import type { NumberProps } from '~/components/number.vue';
import loteriasJSON from "../public/assets/loterias.json";

const selectedLoteria = ref("megasena")

export interface loteriaItem {
    endpoint: string,
    name: string,
    color: string
}

let loterias = new Map<string, loteriaItem>()
loteriasJSON.forEach(item => {
    loterias.set(item.id, {
        endpoint: item.endpoint,
        name: item.name,
        color: item.color
    })
});

interface Teste {
    dataApuracao: string,
    listaDezenas: string[],
    numero: number
}
// AQUI FOI USANDO O USEASYNCDATA E PRECISA SÓ DO OPTION WATCH, O USEFETCH USA O USEASYNCDATA POR TRAS DOS PANOS
const { data: loteria, execute, pending, status} = await useAsyncData<Teste>("loterias-info", 
async () => ($fetch(`https://servicebus2.caixa.gov.br/portaldeloterias/api/${loterias.get(selectedLoteria.value)?.endpoint}`)),
{
    watch: [selectedLoteria],
    pick: ['dataApuracao', 'listaDezenas', 'numero']
})
/*
 AQUI FOI USANDO O USEFETCH, E PRECISA DO COMPUTED
const endpoint = computed(() => {
    return `https://servicebus2.caixa.gov.br/portaldeloterias/api/${loterias.get(selectedLoteria.value)?.endpoint}`
})


const {data: loteria2, error, refresh } = await useFetch<Teste>(endpoint, {
    pick: ['dataApuracao' , 'listaDezenas' , 'numero']
})*/

const listNumbers = computed<NumberProps[]>(() => {
    return loteria.value?.listaDezenas.map((num) => {
    const n: NumberProps = {
        num: num
    }
    return n
}) || []
})

</script>

<style scoped >
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
.container-loteria {
    position: absolute; 
    width: 100vh;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    left: -10vmax;
}
.svg-container {
    position: relative;
    width: 50%;
    height: 100vh;
}
.svg-container .loteria {
    position: absolute;
    width: 100vh;
    height: 100vh;
    left:-10vmax;
}
.info-loteria {
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:space-evenly;
    width: 20vh;
    color: white;
    font-family: "Montserrat";
    font-weight: 700;
}
.info-loteria .icon {
    width: 3em; /* Adjust the size as needed */
    height: 3em; /* Adjust the size as needed */
}
.select-loteria select{
    margin: 2vh 0;
    font-family: "Montserrat";
    font-weight: 400;
    background-color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    outline: none;
    appearance: none;
    width: 200px;
    cursor: pointer;
    transition: all 0.3s ease;
}
.select-loteria select:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
.select-loteria select:focus {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
.concurso-loteria {
    margin: 20px 0;
    align-items: center;
}
</style>