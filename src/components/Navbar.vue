<template>
  <RouterLink to="/"><font-awesome-icon icon="fa-solid fa-home" /></RouterLink>

  <RouterLink to="Books"><font-awesome-icon icon="fa-solid fa-book" /></RouterLink>

  <RouterLink to="Movies"><font-awesome-icon icon="fa-solid fa-film" /></RouterLink>

  <RouterLink to="User"><font-awesome-icon icon="fa-solid fa-user" /></RouterLink>

  <span @click="storeRules.toggleDisplayRules"><font-awesome-icon icon="fa-solid fa-list-check"/></span>

  <Rules v-if="storeRules.displayRules" />
</template>

<script setup>
import { useRulesStore } from "../stores/rules";
import Rules from "../components/Rules.vue";

const storeRules = useRulesStore();
</script>

<style>
span {
  cursor: pointer;
}
</style>
