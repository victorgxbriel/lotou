<template>
    <div class="container">
        <div class="user-info">
            <div>
                <Icon name="mdi:clover" mode="svg" class="icon" color="white" />
                <p>Olá, {{ }}!</p>
            </div>
            <div>
                <ul>
                    <li>Loterias</li>
                    <li>Meus Jogos</li>
                    <li>Meu Perfil</li>
                </ul>
            </div>
        </div>
        <div class="main-content">
            <div class="nav-bar">
                <button>Sair</button>
                <img src="../public/img/logo-lotou-2.png" />
            </div>
            <div class="page-content">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.container {
    display: flex;
    height: 100vh;
    width: 100%;
}
.user-info{
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #419a46;
}
.nav-bar{
    background-color: #a3d2a0;
}
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}
.page-content {
    flex: 1;
    overflow-y: auto;
    align-items: center;
}
</style>