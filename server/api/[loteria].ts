import { useFetch } from "nuxt/app"
import type { NumberProps } from "~/components/number.vue"


export default defineEventHandler(async (event) => {
    interface Teste {
        dataApuracao: string,
        listaDezenas: string[],
        numero: number
    }
    const loteria = event.context.params?.loteria
    const baseUrl = "https://servicebus2.caixa.gov.br/portaldeloterias/api"
    const response = await useFetch<Teste>(`${baseUrl}/${loteria}`, {
        pick: ['dataApuracao', 'listaDezenas', 'numero']
    })

    const data = response.data.value
    const dataFormated = {
        dataApuracao: data.dataApuracao || "",
        listaDezenas: data.listaDezenas.map((num: any) => {
            const n: NumberProps = {
                num: num
            }
            return n
        }) || [],
        numero: data.numero || -1
    }

    return data
})