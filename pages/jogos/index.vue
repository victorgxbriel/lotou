<template>
    <div>
        <ListGames :jogos="jogos" @clicked="(idx) => { handleEvent(idx)}"/>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: "logado"
})

const jogos: Jogo[] = useJogos()
const router = useRouter()
const handleEvent = (idx: number) => {
    router.push(`/jogos/${idx}`)
}
</script>

<style scoped></style>