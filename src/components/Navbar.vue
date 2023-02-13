<template>
  <div class="navbar-container">
    <RouterLink to="/"><font-awesome-icon icon="fa-solid fa-home" /></RouterLink>
    <RouterLink to="Books"><font-awesome-icon icon="fa-solid fa-book" /></RouterLink>
    <RouterLink to="Movies"><font-awesome-icon icon="fa-solid fa-film" /></RouterLink>
    <RouterLink to="User"><font-awesome-icon icon="fa-solid fa-user" /></RouterLink>
    <a href="" @click="storeRules.toggleDisplayRules"><font-awesome-icon icon="fa-solid fa-list-check"/></a>
    <Rules v-if="storeRules.displayRules" />
  </div>
  <div class="navbar-container-desk">
    <RouterLink to="/"> Home</RouterLink>
    <RouterLink to="Books"> Books</RouterLink>
    <RouterLink to="Movies"> Movies</RouterLink>
    <RouterLink to="User"> User</RouterLink>
    <a href="" @click="storeRules.toggleDisplayRules">Rules</a>
    <Rules v-if="storeRules.displayRules" />
  </div>
</template>

<script setup>
import { useRulesStore } from "../stores/rules"
import Rules from "../components/Rules.vue"

const storeRules = useRulesStore()
</script>

<style>
span {
  cursor: pointer;
}
</style>
