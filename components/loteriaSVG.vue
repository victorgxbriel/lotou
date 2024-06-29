<template>
    <div class="svg-container">
        <svg class="loteria" width="100%" height="100%" viewBox="0 0 613 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M613 0C613 0 361.26 501.011 613 1080H0V0H613Z" :fill="props.color"/>
        </svg>
        <div class="container-loteria">
            <SelectLoteria />
            <div class="info-loteria">
                <Icon name="mdi:clover" mode="svg" class="icon" color="white"/>
                <p>{{ props.name }}</p>
            </div>
            <div class="concurso-loteria">
                <p>CONCURSO</p>
                <h3>{{ props.numero }} - {{ props.dataApuracao }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

export type LoteriaSVGProps = {
    name: string,
    color: string,
    numero: string,
    dataApuracao: string
}
const props = defineProps<LoteriaSVGProps>()

</script>

<style scoped>
.container-loteria {
    position: absolute; 
    width: 100vh;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    left: -10vmax;
}
.svg-container {
    position: relative;
    width: 50%;
    height: 100vh;
}
.svg-container .loteria {
    position: absolute;
    width: 100vh;
    height: 100vh;
    left:-10vmax;
}
.info-loteria {
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:space-evenly;
    width: 20vh;
    color: white;
    font-weight: 700;
}
.info-loteria .icon {
    width: 3em; /* Adjust the size as needed */
    height: 3em; /* Adjust the size as needed */
}
.concurso-loteria {
    margin: 20px 0;
    align-items: center;
}
</style>