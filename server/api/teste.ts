import fs from 'fs'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const json = JSON.stringify(body, null, 2)
        await fs.writeFile("../public/assets/jogos.json", json, () => {})
    } catch (error) {
        return error
    }
})