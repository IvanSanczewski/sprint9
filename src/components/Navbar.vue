<template>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="Books">Books</RouterLink>
    <RouterLink to="Movies">Movies</RouterLink>
    <RouterLink to="User">User</RouterLink>
    <span @click="storeRules.toggleRules">Rules</span>
    <div v-if="storeRules.displayRules" class="modal">
        <h2>LEASING RULES</h2>
        <p>Lorem ipsum dolor sit amet consectetur</p>
        <h4>BOOKS</h4>
        <p>Lorem ipsum dolor sit amet consectetur</p>
        <h4>MOVIES</h4>
        <p>Lorem ipsum dolor sit amet consectetur</p>
    </div>
</template>
  
<script setup>
import { useRulesStore } from '../stores/rules'

const storeRules = useRulesStore()
</script>

<style>
span {
    cursor: pointer
}
</style>