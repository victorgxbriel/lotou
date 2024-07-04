<template>
    <div class="logo-container">
        <img src="../public/img/logo-lotou.png" alt="logo">
    </div>
    <div class="login-container">
        <h1>Login</h1>
        <br>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
    <div class="options-container">
        <a href="http://" target="_blank" rel="noopener noreferrer">Esqueceu a senha?</a> <br>
        <a href="http://" target="_blank" rel="noopener noreferrer">Criar conta</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        handleLogin() {
            //TODO - Lógica de login
            console.log('Email:', this.email);
            console.log('Password:', this.password);

            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.logo-container {
    text-align: center;
    max-width: 500px;
    max-height: 350px;
    margin: auto;
    
}

.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.options-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

form div {
    margin-bottom: 10px;
}
label {
    display: block;
    margin-bottom: 5px;
}
input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
button:hover {
    background-color: #0056b3;
}
</style>