<template>
  <!-- H E A D E R -->
  <header>
    <div class="social-container">
      <div class="social-btn">ig</div>
      <div class="social-btn">fb</div>
      <div class="social-btn">tw</div>
      <div class="social-btn">yt</div>
    </div>
    <h1>the NATIONAL LIBRARY</h1>
    <div class="user-actions-container">
      <!-- <span class="user-action">LogIn</span> -->
      <div>
        <div v-show="!storeGetUser.isLogged" @click="storeGetUser.getRegisteredUser" class="user-action">LogIn</div>
        <div v-show="storeGetUser.isLogged" class="user-action"> LogOut</div>
      </div>
      <div class="user-action">SignIn</div>
      <!--<LogIn />  ACTIVATE LOGIN COMPONENT -->
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

