

export default async function(loteira: Loteria, num: number) {
    const concursos: Concurso[] = []
    for(let j = 0; j < 5; j++) {
        let endpoint = ``
        if(j !== 0){
            endpoint = `/${num-j}`
        }
        const { data, error } = await useFetch<Concurso>(`https://servicebus2.caixa.gov.br/portaldeloterias/api/${loteira.endpoint}${endpoint}`, {
            pick: ['numero', 'dataApuracao']
        })
        if(error.value){
            console.error(`Error fetching data for ${num - j}: `, error.value)
            continue
        }
        if(data.value){
            const c: Concurso = data.value
            concursos.push(c)
        } else {
            console.warn(`No data found for ${num - j}`)
        }
        console.log(endpoint)
    }
    return concursos
}