import { resolve } from 'path'
import {promises as fs } from 'fs'
import { errorMessages } from 'vue/compiler-sfc'
import { Loteria } from './index.get'

export default defineEventHandler(async (event) => {
    try {

        const body = await readBody(event)
        if(!body.nome || !body.numMax || !body.numMin || !body.numPremiacao || !body.cor || !body.endpoint || !body.variacaoNum ||
            typeof body.name !== 'string' || typeof body.numMax !== 'number' || typeof body.numMin !== 'number' || typeof body.cor !== 'string' ||
            typeof body.endpoint !== 'string' || typeof body.variacaoNum !== 'number' || typeof body.numPremiacao !== 'object'
        ){
            return {
                statusCode: 400,
                statusMessage: 'Bad Request',
                error: 'Invalid user data'
            }
        }

        const filePath = resolve('public/assets/loterias.json')
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const loterias: Loteria[] = JSON.parse(fileContent)

        const newLoteria: Loteria = {
            nome: body.nome,
            numMax: body.numMax,
            numMin: body.numMin,
            cor: body.cor,
            endpoint: body.endpoint,
            variacaoNum: body.variacaoNum,
            numPremiacao: body.numPremiacao,
            id: loterias.length ? Math.max(...loterias.map(l => l.id)) + 1 : 1
        }

        loterias.push(newLoteria)

        await fs.writeFile(filePath, JSON.stringify(loterias, null, 2), 'utf-8')
        return newLoteria
    } catch (error){
        return {
            statusCode: 500,
            statusMessage: 'Internal server error',
            error: errorMessages
        }
    }
})