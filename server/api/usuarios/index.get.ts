import { resolve } from 'path'
import {promises as fs } from 'fs'
import { errorMessages } from 'vue/compiler-sfc'
import { Usuario } from '~/composables/types'


export default defineEventHandler(async (event) => {
    try {
        const filePath = resolve("public/assets/usuarios.json")
        const fileContent = await fs.readFile(filePath, 'utf-8')

        const usuarios: Usuario[] = JSON.parse(fileContent);
        return usuarios
    } catch( error ){
        return {
            statusCode: 500,
            statusMessage: 'Internal server error',
            error: errorMessages
        }
    }
})