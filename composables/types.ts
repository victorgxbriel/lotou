import type { NumberProps } from "~/components/number.vue"

export type Loteria = {
    nome: string,
    numMax: number,
    numMin: number,
    cor: string,
    endpoint: string,
    variacaoNum: number,
    numPremiacao: number[],
    id: number
}

export type Jogo = {
    name: string,
    id: number,
    loteria: Loteria,
    resultado: NumberProps[],
    listNumbers: NumberProps[],
    createAt: Date,
    numero: string
}

export type Usuario = {
    name: string,
    email: string,
    senha: string,
    id: number
}

export type ResponseLoterias = {
    dataApuracao: string,
    listaDezenas: string[],
    numero: number
}

export type Concurso = {
    numero: string,
    dataApuracao: string
}