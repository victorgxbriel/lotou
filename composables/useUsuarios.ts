import usuariosJSON from "../public/assets/usuarios.json"

export default function() {
    const usuarios: Usuario[] = JSON.parse(JSON.stringify(usuariosJSON))
    return usuarios
}