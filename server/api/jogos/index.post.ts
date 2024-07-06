import { resolve } from 'path'
import { promises as fs } from 'fs'
import { errorMessages } from 'vue/compiler-sfc'
import { Jogo } from './index.get'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        if(!body.name || !body.loteria || !body.listNumbers || typeof body.name !== 'string' || typeof body.loteria !== 'object' ||
            typeof body.listNumbers !== 'object' || !body.numero || typeof body.numero !== 'number'){
            return {
                statusCode: 400,
                statusMessage: 'Bad Request',
                error: 'Invalid user data'
            }
        }

        const filePath = resolve("public/assets/jogos.json")
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const jogos: Jogo[] = JSON.parse(fileContent)

        const newJogo: Jogo = {
            name: body.name,
            loteria: body.loteria,
            resultado: body.resultado,
            listNumbers: body.listNumbers,
            id: jogos.length ? Math.max(...jogos.map(j => j.id)) + 1 : 1,
            createAt: new Date(),
            numero: body.numero
        }

        jogos.push(newJogo)

        await fs.writeFile(filePath, JSON.stringify(jogos, null, 2), 'utf-8')
        return newJogo
    } catch ( error ) {
        return {
            statusCode: 500,
            statusMessage: 'Internal server error',
            error: errorMessages
        }
    } 
})