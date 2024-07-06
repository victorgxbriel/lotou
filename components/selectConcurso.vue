<template>
    <div class="select-loteria">
        <select v-model="selectedLoteria" name="loteria">
            <option v-for="loteria in loterias" :value="loteria" >{{ loteria.cor }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">


const { selectedLoteria, loterias } = inject("select-concurso") as {
    selectedLoteria: Loteria,
    loterias: Loteria[]
}
console.log(loterias)

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