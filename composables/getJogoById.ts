
export default function(id:number): Jogo {
    const jogos: Jogo[] = useJogos()
    const idxjogo = jogos.findIndex(jg => jg.id === id)
    return jogos[idxjogo]
}