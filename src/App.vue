<template>
  <!-- H E A D E R -->
  <header>
    <div class="social">Social Icons</div>
    <h1>THE NATIONAL LIBRARY</h1>
    <div class="user-actions-container">
      <!-- <span class="user-action">LogIn</span> -->
      <span @click="storeGetUser.getRegisteredUser" class="user-action">LogIn</span>
      <LogIn /> <!-- ACTIVATE LOGIN COMPONENT -->
      <span class="user-action"> | SignIn</span>
      <span v-show="storeGetUser.isLogged" class="user-action"> | LogOut</span>
    </div>
    <div class="header">
      <Navbar />
    </div>
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

