import jogosJSON from "../public/assets/jogos.json"

export default function() {
    const jogos: Jogo[] = JSON.parse(JSON.stringify(jogosJSON))
    return jogos
}