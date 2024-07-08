import { resolve } from 'path'
import { promises as fs } from 'fs'
import { Usuario } from './index.get'
import { errorMessages } from 'vue/compiler-sfc'

export default defineEventHandler( async (event) => {
    try {
        const body = await readBody(event)

        if(!body.name || !body.email || !body.senha || typeof body.name !== 'string' || typeof body.senha !== 'string' || typeof body.email !== 'string') {
            return {
                statusCode: 400,
                statusMessage: 'Bad Request',
                error: 'Invalid user data'
            }
        }

        const filePath = resolve("public/assets/usuarios.json")
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const usuarios: Usuario[] = JSON.parse(fileContent)

        const newUser: Usuario ={
            id: usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
            name: body.name,
            email: body.email,
            senha: body.senha
        }

        usuarios.push(newUser)

        await fs.writeFile(filePath, JSON.stringify(usuarios, null, 2), 'utf-8')
        return newUser
    } catch(error) {
        return {
            statusCode: 500,
            statusMessage: 'Internal server error',
            error: errorMessages
        }
    }
})