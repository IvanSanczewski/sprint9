<template>
  <!-- H E A D E R -->
  <header>
    <div class="social-fb">fb</div>
    <div class="social-tw">tw</div>
    <div class="social-ytb">ytb</div>
    <div class="user-log">
      <!-- <span class="user-action">LogIn</span> -->
      <div v-show="!storeGetUser.isLogged" @click="storeGetUser.getRegisteredUser" class="user-action">LogIn</div>
      <div v-show="storeGetUser.isLogged" class="user-action"> LogOut</div>
      <!--<LogIn />  ACTIVATE LOGIN COMPONENT -->
    </div>
    <div class="user-sign">SignIn</div>
    <div class="navbar">
      <Navbar />
    </div>
    <h1 class="title">the NATIONAL LIBRARY</h1>
  </header>
  
  <!-- C O N T E N T -->
  <RouterView />

  <!-- F O O T E R -->
  <footer>
    <Footer />
  </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import LogIn from './components/LogIn.vue'

import { useGetUserStore } from './stores/getUser'

console.log('login component accessed')

const storeGetUser = useGetUserStore()
</script>

