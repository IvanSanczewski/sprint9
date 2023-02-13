<template>
  <div class="footer-container">
    <div class="footer-content">
      <a href="#">The Archive</a>
      <a href="#" @click="storeRules.toggleDisplayRules">Library Rules</a>
      <a href="#">Donate documents</a>
      <a href="#">Education</a>
      <a href="#">Work oportunities</a>
    </div>
    <div class="footer-close">
      <img src="@/assets/img/NATLIB_LOGO.png" alt="The NAT-LIB logo" style="width: 35px">
      <p>©The NATIONAL LIBRARY of Lithuania, 2023</p>
    </div>
  </div>
  <div>
    <a href="#" ></a>
  </div>
</template>

<script setup>
import { useRulesStore } from '../stores/rules'
// import Rules from "../components/Rules.vue"

const storeRules = useRulesStore()

name: 'Footer '
  // export default {
  // }
</script>

<style>

</style>