import { resolve } from 'path'
import {promises as fs } from 'fs'
import { errorMessages } from 'vue/compiler-sfc'
import { Loteria } from '~/composables/types'


export default defineEventHandler(async (event) => {
    try {
        const filePath = resolve("/assets/loterias.json")
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const loterias: Loteria[] = JSON.parse(fileContent)

        return loterias
    } catch (error) {
        return {
            statusCode: 500,
            statusMessage: 'Internal server error',
            error: errorMessages
        }
    } 
})