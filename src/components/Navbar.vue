<template>
    <RouterLink to="/"><font-awesome-icon icon="fa-solid fa-home" /></RouterLink>
    <RouterLink to="Books"><font-awesome-icon icon="fa-solid fa-book" /></RouterLink>
    <RouterLink to="Movies"><font-awesome-icon icon="fa-solid fa-film" /></RouterLink>
    <RouterLink to="User"><font-awesome-icon icon="fa-solid fa-user" /></RouterLink>
    <span @click="storeRules.toggleRules"><font-awesome-icon icon="fa-solid fa-list-check" /></span>
    <Rules v-if="storeRules.displayRules"/>
    
    <!-- <div v-if="storeRules.displayRules" class="modal">
        <h2>LEASING RULES</h2>
        <p>Lorem ipsum dolor sit amet consectetur</p>
        <h4>BOOOOOOOOOOOOOOKS</h4>
        <p>Lorem ipsum dolor sit amet consectetur</p>
        <h4>MOVIES</h4>
        <p>Lorem ipsum dolor sit amet consectetur</p>
    </div> -->
</template>
  
<script setup>
import { useRulesStore } from '../stores/rules'
import Rules from '../components/Rules.vue'

const storeRules = useRulesStore()
</script>

<style>
span {
    cursor: pointer
}
</style>