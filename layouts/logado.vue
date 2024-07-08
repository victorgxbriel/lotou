<template>
    <div>
        <nav>
            <ul>
                <li><nuxt-link to="/">Home</nuxt-link></li>
                <li><nuxt-link to="/jogos">Meus Jogos</nuxt-link></li>
                <li><nuxt-link to="/jogos/form">Criar jogo</nuxt-link></li>
                <li><nuxt-link to="/login">Logout</nuxt-link></li>
            </ul>
        </nav>
        <NuxtPage />
    </div>
</template>

<script>
export default {
    name: 'DefaultLayout'
}
</script>

<style>
nav {
    background-color: #f8f9fa;
    padding: 10px;
}

nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
}

nav ul li {
    margin-right: 20px;
}

nav ul li a {
    text-decoration: none;
    color: #007bff;
}

nav ul li a:hover {
    text-decoration: underline;
}
</style>