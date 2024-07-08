import { resolve } from 'path'
import { promises as fs } from 'fs'
import { errorMessages } from 'vue/compiler-sfc'
import { Jogo } from "~/composables/types"


export default defineEventHandler( async (event) => {
    try {
        const filePath = resolve("public/assets/jogos.json")
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const jogos: Jogo[] = JSON.parse(fileContent)
        return jogos
    } catch (error) {
        return {
            statusCode: 500,
            statusMessage: 'Internal server error',
            error: errorMessages
        }
    }
})