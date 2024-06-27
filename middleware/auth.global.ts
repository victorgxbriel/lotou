const logado = false

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== "/" && logado) {
        return navigateTo("/")
    }
})