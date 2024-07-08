<template>
    <div class="select-loteria">
        <select v-model="selectedConcurso" name="loteria">
            <option v-for="concurso in concursos" :value="concurso.numero" >{{ concurso.numero }} - {{ concurso.dataApuracao }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">


const { selectedConcurso, concursos } = inject("select-concurso") as {
    selectedConcurso: Concurso,
    concursos: Concurso[]
}
console.log(concursos)

</script>

<style scoped>
.select-loteria select{
    margin: 2vh 0;
    font-family: "Montserrat";
    font-weight: 400;
    background-color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    outline: none;
    appearance: none;
    width: 200px;
    cursor: pointer;
    transition: all 0.3s ease;
}
.select-loteria select:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
.select-loteria select:focus {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
</style>