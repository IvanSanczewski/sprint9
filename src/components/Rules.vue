<template>
    <div class="modal">
        <button @click="storeRules.toggleRules">X</button>

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

console.log('Rules component accessed')
</script>

<style>
.modal {
    color: rgb(0, 30, 0);
    background: #999;

}
</style>
