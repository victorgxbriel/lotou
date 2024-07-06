<template>
    <div>
        <h1>Novo jogo</h1>
        <form @subimt.prevent="">
            <div>
                <label for="nome">Nome:</label>
                <input type="text" id="nome" v-model="jogo.name" required>
            </div>
            <div>
                <p>Loteria: </p>
                <SelectLoteria />
            </div>
            <div>
                <label for="concurso">Concurso: </label>
                <SelectConcurso />
                <input type="text" id="concurso" v-model="jogo.numero"  required placeholder="Atual"/>
            </div>
            <div>
                <p>Números: </p>
                <ListNumber :listNumbers="list" />
                <div>
                    <Icon class="icon" name="lets-icons:add-duotone" mode="svg" color="black" v-if="num === ''"/>
                    <input type="text" v-model="num" @keyup.enter="addNumber"/>
                    <span v-if="boolNum">Número invalido! Escolha um número entre: 1 e {{ selectedLoteria.variacaoNum }}</span>
                </div>
            </div>
        </form>
        <p>{{ selectedLoteria.cor }} e {{ selectedLoteria.endpoint }} e {{ loteria }}</p>
    </div>
</template>

<script setup lang="ts">
import type { NumberProps } from '~/components/number.vue';
import type { Concurso } from '~/composables/types';

const jogo = reactive<Jogo>({
    name: '',
    numero: '',
    id: 0,
    resultado: [],
    listNumbers: [],
    createAt: new Date(),
    loteria: {
        numMax: 0,
        numMin: 0,
        cor: '',
        nome: '',
        endpoint: '',
        variacaoNum: 0,
        id: 0,
        numPremiacao: []
    }
})

const list = reactive<NumberProps[]>([])

const num = ref<string>('')
const boolNum = ref<boolean>(false)


const addNumber = () => {
    if(isValidNumber(num.value || '', selectedLoteria.value) && isUniqueNumber(num.value, list)){
        list.push({
        // ignora
        num: num.value
        })  
        num.value = ''
        boolNum.value =false
    } else {
        boolNum.value = true
    }
}

const loterias: Loteria[] = useLoteria()
const selectedLoteria = ref<Loteria>(loterias[0])

provide("select-loteria", {
    selectedLoteria,
    loterias
})

const concurso = []
const selectedConcurso = ref<Concurso>

provide("select-concurso", {

})

const { data: loteria, execute, error, status } = await useLazyAsyncData<ResponseLoterias>("loterias-info",
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

/* tentei fazer com server/api mas só retornava nulo
const {data, error, pending, status } = await useFetch<Loteria[]>("/api/loterias", {
    method: 'GET'
})
const loterias: Loteria[] = data.value || []
*/

</script>

<style scoped>
.icon {
    width: 5em; /* Adjust the size as needed */
    height: 5em; /* Adjust the size as needed */
}
</style>