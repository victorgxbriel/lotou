<template>
    <div class="container">
        <h1>Novo jogo</h1>
        <div>
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
            </div>
            <div>
                <p>Números: </p>
                <div class="numbers">
                    <div class="input-wrapper">
                        <!--
                        <Icon class="icon" name="lets-icons:add-duotone" mode="svg" color="black" v-if="num === ''"/>
                        -->
                        <input type="text" v-model="num" @keyup.enter="addNumber" />
                    </div>
                    <span v-if="boolNum">Número invalido! Escolha um número entre: 1 e {{ selectedLoteria.variacaoNum
                        }}</span>
                </div>
                <ListNumber :listNumbers="list" :form="form" @remove="(num: string) => remNumber(num)" />
            </div>
            <div class="div-buttons">
                <button style="color: blue;" @click="addJogo">Criar</button>
                <button @click="cancelar" >Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { NumberProps } from '~/components/number.vue';
import type { Concurso } from '~/composables/types';

definePageMeta({
    layout: "logado"
})

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

const router = useRouter()

const form = ref<boolean>(true)

const list = reactive<NumberProps[]>([])

const num = ref<string>('')
const boolNum = ref<boolean>(false)

const remNumber = (num: string) => {
    const idx = list.findIndex(item => item.num === num)
    if(idx !== -1)
        list.splice(idx, 1)
}

const addNumber = () => {
    if (isValidNumber(num.value || '', selectedLoteria.value) && isUniqueNumber(num.value, list)) {
        list.push({
            // ignora
            num: num.value
        })
        num.value = ''
        boolNum.value = false
    } else {
        boolNum.value = true
    }
}

const addJogo = () => {
    /*
    jogo.loteria = selectedLoteria.value
    jogo.numero = selectedConcurso.value?.numero || ""
    jogo.listNumbers = list
    jogo.resultado = loteria.value?.listaDezenas.map((num) => {
        const n: NumberProps = {
            num: num
        }
        return n
    }) || []
    const idd =useAddJogo(jogo)
    console.log(idd) */
    router.push(`/jogos/2`)
}

const cancelar = () => {
    router.push("/jogos")
}

const loterias: Loteria[] = useLoteria()
const selectedLoteria = ref<Loteria>(loterias[0])

provide("select-loteria", {
    selectedLoteria,
    loterias
})

const concursos = ref<Concurso[]>()
const selectedConcurso = ref<Concurso>()

provide("select-concurso", {
    selectedConcurso,
    concursos
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

watch([selectedLoteria, loteria], async () => {
    if (loteria.value?.numero)
        concursos.value = await useConcursos(selectedLoteria.value, loteria.value?.numero)
    else
        concursos.value = []
})



</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.icon {
    position: absolute;
    width: 5em;
    /* Adjust the size as needed */
    height: 5em;
    /* Adjust the size as needed */
}

.numbers {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.input-wrapper input[type="text"] {
    width: 4vmax;
    height: 4vmax;
    border-radius: 50%;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 1em;
}

.input-wrapper input[type="text"]:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
}

.div-buttons {
    margin-top: 1vmax;
    display: flex;
    justify-content: space-evenly;
}
.div-buttons button {
    width: 5vmax;
    height: 2vmax;
    border-radius: 1vmax;
}
</style>